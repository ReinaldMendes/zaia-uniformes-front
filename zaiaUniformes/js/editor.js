/**
 * Editor Visual ZAIA CMS
 * Editor inline simples e eficiente para admins
 */

const token = localStorage.getItem("authToken");
if (!token) return;

// Editar texto com ícone ✏️
document.querySelectorAll("[data-content]").forEach(el => {
    const editIcon = document.createElement("span");
    editIcon.innerHTML = "✏️";
    editIcon.style.marginLeft = "10px";
    editIcon.style.cursor = "pointer";
    editIcon.style.display = "inline-block";
    editIcon.style.verticalAlign = "middle";

    el.appendChild(editIcon);

    editIcon.onclick = () => {
        const novoTexto = prompt("Editar texto:", el.innerText);
        if (!novoTexto) return;

        const key = el.getAttribute("data-content");

        updateContent(key, {
            value: novoTexto
        }).then(() => {
            el.innerText = novoTexto;
            el.appendChild(editIcon);
        }).catch(err => {
            alert("Erro ao salvar: " + err.message);
        });
    }
});

// Editar imagem com upload
document.querySelectorAll("[data-image]").forEach(img => {
    img.style.cursor = "pointer";

    img.onclick = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            try {
                const result = await uploadImage(file);
                if (result.url) {
                    img.src = result.url;
                    const key = img.getAttribute("data-image");
                    await updateContent(key, {
                        value: result.url
                    });
                    alert("Imagem atualizada com sucesso!");
                }
            } catch (err) {
                alert("Erro ao fazer upload: " + err.message);
            }
        }

        input.click();
    }
});