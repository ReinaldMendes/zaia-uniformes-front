/**
 * EXEMPLOS DE USO - CMS ZAIA
 * 
 * Este arquivo contém exemplos de como usar o CMS em diferentes cenários.
 * Copie e adapte o código conforme necessário!
 */

// ============================================================================
// EXEMPLO 1: Conteúdo de Texto Simples
// ============================================================================

/*
HTML:
<section id="about">
    <h2 data-content="about_title">Carregando...</h2>
    <p data-content="about_text">Carregando...</p>
</section>

CSS:
#about {
    padding: 60px 0;
    background: #f5f5f5;
}

JavaScript (automático com dynamic-content-loader.js):
- O conteúdo é carregado automaticamente
- Nenhum JavaScript adicional necessário!
*/

// ============================================================================
// EXEMPLO 2: Seção Completa de Transformação
// ============================================================================

/*
HTML:
<section id="hero" class="hero">
    <div class="hero-overlay">
        <div class="hero-content">
            <h1 data-content="hero_title">Carregando...</h1>
            <p data-content="hero_subtitle">Carregando...</p>
            <a href="#" class="cta-button" data-content="cta_button_text">Clique Aqui</a>
        </div>
        <img src="placeholder.webp" data-image="hero_image" alt="Hero Image" class="hero-image">
    </div>
</section>

CSS:
.hero {
    background: linear-gradient(135deg, #1E3A5F 0%, #2F5F8F 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 60px 20px;
}

.hero-content {
    text-align: center;
    margin-right: 60px;
    flex: 1;
}

.hero-content h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
    font-family: 'Playfair Display', serif;
}

.hero-content p {
    font-size: 1.5rem;
    margin-bottom: 40px;
}

.hero-image {
    flex: 1;
    max-width: 500px;
    width: 100%;
    height: auto;
    border-radius: 12px;
}

.cta-button {
    display: inline-block;
    padding: 15px 40px;
    background: #D4AF37;
    color: #1E3A5F;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 700;
    transition: all 0.3s;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}
*/

// ============================================================================
// EXEMPLO 3: Cards Dinâmicos com Conteúdo
// ============================================================================

/*
HTML:
<section class="features">
    <h2 data-content="features_title">Carregando...</h2>
    <div class="features-grid">
        <div class="feature-card">
            <i class="fas fa-star"></i>
            <h3 data-content="feature_1_title">Carregando...</h3>
            <p data-content="feature_1_description">Carregando...</p>
        </div>
        <div class="feature-card">
            <i class="fas fa-bolt"></i>
            <h3 data-content="feature_2_title">Carregando...</h3>
            <p data-content="feature_2_description">Carregando...</p>
        </div>
        <div class="feature-card">
            <i class="fas fa-heart"></i>
            <h3 data-content="feature_3_title">Carregando...</h3>
            <p data-content="feature_3_description">Carregando...</p>
        </div>
    </div>
</section>

CSS:
.features {
    padding: 80px 20px;
    background: white;
}

.features h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 60px;
    color: #1E3A5F;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
}

.feature-card {
    padding: 40px;
    background: #f9f9f9;
    border-radius: 12px;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-card i {
    font-size: 40px;
    color: #D4AF37;
    margin-bottom: 20px;
}

.feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #1E3A5F;
}

.feature-card p {
    color: #666;
    line-height: 1.6;
}
*/

// ============================================================================
// EXEMPLO 4: Seção Testemunhos
// ============================================================================

/*
HTML:
<section class="testimonials">
    <h2 data-content="testimonials_title">Carregando...</h2>
    <div class="testimonials-grid">
        <div class="testimonial-card">
            <div class="rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <p data-content="testimonial_1_text">Carregando...</p>
            <p class="author" data-content="testimonial_1_author">Carregando...</p>
        </div>
        <div class="testimonial-card">
            <div class="rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <p data-content="testimonial_2_text">Carregando...</p>
            <p class="author" data-content="testimonial_2_author">Carregando...</p>
        </div>
    </div>
</section>

CSS:
.testimonials {
    padding: 80px 20px;
    background: #f5f5f5;
}

.testimonials h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 60px;
    color: #1E3A5F;
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
}

.testimonial-card {
    padding: 40px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.rating {
    color: #D4AF37;
    margin-bottom: 20px;
}

.rating i {
    margin-right: 5px;
}

.testimonial-card p {
    color: #666;
    line-height: 1.8;
    margin-bottom: 15px;
}

.author {
    font-weight: 600;
    color: #1E3A5F;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e0e0e0;
}
*/

// ============================================================================
// EXEMPLO 5: Parceiros em Grid
// ============================================================================

/*
HTML:
<section class="partners">
    <h2 data-content="partners_title">Nossos Parceiros</h2>
    <div class="partners-grid" data-partners="list" data-template="grid">
        <!-- Parceiros carregados automaticamente -->
    </div>
</section>

CSS:
.partners {
    padding: 80px 20px;
    background: white;
}

.partners h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 60px;
    color: #1E3A5F;
}

.partners-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
}

.partner-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    background: #f9f9f9;
    border-radius: 12px;
    transition: transform 0.3s, box-shadow 0.3s;
}

.partner-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.partner-logo {
    width: 150px;
    height: 100px;
    object-fit: contain;
    margin-bottom: 15px;
}

.partner-name {
    text-align: center;
    color: #1E3A5F;
    font-weight: 600;
    font-size: 1.1rem;
}
*/

// ============================================================================
// EXEMPLO 6: Contato Com Informações Dinâmicas
// ============================================================================

/*
HTML:
<section class="contact">
    <h2 data-content="contact_title">Entre em Contato</h2>
    <div class="contact-info">
        <div class="info-item">
            <i class="fas fa-phone"></i>
            <p data-content="contact_phone">Carregando...</p>
        </div>
        <div class="info-item">
            <i class="fas fa-envelope"></i>
            <p data-content="contact_email">Carregando...</p>
        </div>
        <div class="info-item">
            <i class="fas fa-map-marker-alt"></i>
            <p data-content="contact_address">Carregando...</p>
        </div>
    </div>
    <div class="contact-form">
        <form id="contactForm">
            <input type="text" placeholder="Seu nome" required>
            <input type="email" placeholder="Seu email" required>
            <textarea placeholder="Sua mensagem" rows="5" required></textarea>
            <button type="submit">Enviar</button>
        </form>
    </div>
</section>

CSS:
.contact {
    padding: 80px 20px;
    background: linear-gradient(135deg, #1E3A5F 0%, #2F5F8F 100%);
    color: white;
    text-align: center;
}

.contact h2 {
    font-size: 2.5rem;
    margin-bottom: 60px;
}

.contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
}

.info-item i {
    font-size: 32px;
    color: #D4AF37;
    margin-bottom: 15px;
}

.contact-form {
    max-width: 500px;
    margin: 0 auto;
}

.contact-form input,
.contact-form textarea {
    width: 100%;
    padding: 15px;
    margin-bottom: 15px;
    border: none;
    border-radius: 6px;
    font-family: inherit;
}

.contact-form button {
    width: 100%;
    padding: 15px;
    background: #D4AF37;
    color: #1E3A5F;
    border: none;
    border-radius: 6px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.3s;
}

.contact-form button:hover {
    background: #c4a038;
}
*/

// ============================================================================
// EXEMPLO 7: Footer Dinâmico com Links
// ============================================================================

/*
HTML:
<footer class="footer">
    <div class="footer-content">
        <div class="footer-section">
            <h3>Sobre ZAIA</h3>
            <p data-content="footer_about" data-html="true"></p>
        </div>
        <div class="footer-section">
            <h3>Links Rápidos</h3>
            <nav class="footer-links" data-content="footer_quicklinks" data-html="true"></nav>
        </div>
        <div class="footer-section">
            <h3>Redes Sociais</h3>
            <div class="social-links" data-content="footer_social" data-html="true"></div>
        </div>
    </div>
    <div class="footer-bottom">
        <p data-content="footer_copyright"></p>
    </div>
</footer>

CSS:
.footer {
    background: #1E3A5F;
    color: white;
    padding: 60px 20px 20px;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto 40px;
}

.footer-section h3 {
    color: #D4AF37;
    margin-bottom: 20px;
    font-size: 1.3rem;
}

.footer-section p,
.footer-section a {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 10px;
    text-decoration: none;
}

.footer-section a:hover {
    color: #D4AF37;
}

.footer-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.social-links {
    display: flex;
    gap: 15px;
}

.social-links a {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    transition: background 0.3s;
}

.social-links a:hover {
    background: #D4AF37;
}

.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    padding-top: 20px;
    color: rgba(255, 255, 255, 0.6);
}

CONTEÚDO NO CMS:
- footer_about: <p>Somos especialistas em...</p>
- footer_quicklinks: <a href="#">Home</a><a href="#">Serviços</a>...
- footer_social: <a href="https://facebook.com">f</a><a href="https://instagram.com">i</a>...
- footer_copyright: © 2024 ZAIA Uniformes. Todos os direitos reservados.
*/

// ============================================================================
// EXEMPLO 8: Seção de FAQ (Perguntas Frequentes)
// ============================================================================

/*
HTML:
<section class="faq">
    <h2 data-content="faq_title">Perguntas Frequentes</h2>
    <div class="faq-container">
        <div class="faq-item">
            <div class="faq-question" onclick="toggleFAQ(this)">
                <span data-content="faq_q1">Carregando...</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
                <p data-content="faq_a1">Carregando...</p>
            </div>
        </div>
        <div class="faq-item">
            <div class="faq-question" onclick="toggleFAQ(this)">
                <span data-content="faq_q2">Carregando...</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
                <p data-content="faq_a2">Carregando...</p>
            </div>
        </div>
    </div>
</section>

CSS:
.faq {
    padding: 80px 20px;
    background: white;
}

.faq h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 60px;
    color: #1E3A5F;
}

.faq-container {
    max-width: 700px;
    margin: 0 auto;
}

.faq-item {
    margin-bottom: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
}

.faq-question {
    padding: 20px;
    background: #f9f9f9;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    color: #1E3A5F;
    transition: background 0.3s;
}

.faq-question:hover {
    background: #f0f0f0;
}

.faq-question i {
    transition: transform 0.3s;
}

.faq-item.active .faq-question i {
    transform: rotate(180deg);
}

.faq-answer {
    display: none;
    padding: 20px;
    background: white;
    color: #666;
    line-height: 1.6;
}

.faq-item.active .faq-answer {
    display: block;
}

JavaScript:
function toggleFAQ(element) {
    element.parentElement.classList.toggle('active');
}
*/

// ============================================================================
// COMO ADICIONAR TUDO NO SEU HTML
// ============================================================================

/*
ORDEM CORRETA NO FINAL DO index.html:

<script src="/admin/api.js"></script>
<script src="/js/dynamic-content-loader.js"></script>

<!-- Seus scripts específicos (se houver) -->
<script>
// Seu código JavaScript aqui
function toggleFAQ(element) {
    element.parentElement.classList.toggle('active');
}

// Mais funções...
</script>
</body>
</html>
*/
