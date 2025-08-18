// Pappa Fresh - JavaScript Comune

// ============================================
// CONFIGURAZIONE
// ============================================

// Stato globale
let currentLang = localStorage.getItem('pappa-lang') || 'it';
let cart = JSON.parse(localStorage.getItem('pappa-cart')) || [];
let calculatorData = {};

// ============================================
// SISTEMA MULTILINGUE
// ============================================

const translations = {
    it: {
        // Navigazione
        'nav.products': 'Prodotti',
        'nav.trial': 'Box Prova',
        'nav.faq': 'FAQ',
        'nav.chat': 'Assistenza',
        'nav.contact': 'Contatti',
        'nav.blog': 'Blog',
        
        // Home
        'home.hero.title': 'Cibo fresco per cani, consegnato a casa tua',
        'home.hero.subtitle': 'Nutrizione naturale preparata con ingredienti di qualità umana',
        'home.hero.cta': 'Calcola il Piano Perfetto',
        'home.why.title': 'Perché scegliere Pappa Fresh?',
        'home.why.fresh': 'Ingredienti Freschi',
        'home.why.fresh.text': 'Solo carni e verdure fresche di qualità umana',
        'home.why.vet': 'Approvato dai Veterinari',
        'home.why.vet.text': 'Formulato con esperti nutrizionisti veterinari',
        'home.why.delivery': 'Consegna Refrigerata',
        'home.why.delivery.text': 'Consegnato fresco in tutta Italia in 24-48 ore',
        'home.why.custom': 'Piano Personalizzato',
        'home.why.custom.text': 'Porzioni calibrate sulle esigenze del tuo cane',
        
        // Box Prova
        'trial.title': 'Calcola il Piano Perfetto per il tuo Cane',
        'trial.subtitle': 'Scopri le porzioni ideali e il piano nutrizionale personalizzato',
        'trial.step1': 'Informazioni Base',
        'trial.step2': 'Salute e Attività',
        'trial.step3': 'Il Tuo Piano',
        'trial.name': 'Nome del cane',
        'trial.breed': 'Razza',
        'trial.weight': 'Peso attuale (kg)',
        'trial.age': 'Età',
        'trial.age.puppy': 'Cucciolo (2-12 mesi)',
        'trial.age.young': 'Giovane (1-2 anni)',
        'trial.age.adult': 'Adulto (3-7 anni)',
        'trial.age.senior': 'Senior (8+ anni)',
        'trial.activity': 'Livello di attività',
        'trial.activity.low': 'Basso (passeggiate tranquille)',
        'trial.activity.moderate': 'Moderato (1-2 ore al giorno)',
        'trial.activity.high': 'Alto (molto attivo, sport)',
        'trial.neutered': 'Sterilizzato/Castrato?',
        'trial.yes': 'Sì',
        'trial.no': 'No',
        'trial.condition': 'Condizione corporea',
        'trial.condition.underweight': 'Sottopeso',
        'trial.condition.ideal': 'Peso ideale',
        'trial.condition.overweight': 'Sovrappeso',
        'trial.condition.obese': 'Obeso',
        'trial.next': 'Avanti',
        'trial.back': 'Indietro',
        'trial.calculate': 'Calcola Piano',
        'trial.results.title': 'Il Piano Perfetto per',
        'trial.results.calories': 'Calorie giornaliere',
        'trial.results.portions': 'Bustine Pappa Fresh al giorno',
        'trial.results.monthly': 'Bustine al mese',
        'trial.results.recommendation': 'Prodotto consigliato',
        'trial.results.cta': 'Vai ai Prodotti',
        
        // Prodotti
        'products.title': 'I Nostri Prodotti',
        'products.subtitle': 'Ricette bilanciate per ogni esigenza',
        'products.filter.all': 'Tutti',
        'products.filter.puppy': 'Cuccioli',
        'products.filter.adult': 'Adulti',
        'products.filter.senior': 'Senior',
        'products.filter.special': 'Speciali',
        'products.add': 'Aggiungi al Carrello',
        'products.vet.title': 'Sviluppato nelle nostre Cliniche Veterinarie',
        'products.vet.text': 'Ogni ricetta è stata sviluppata e testata dal nostro team di veterinari nutrizionisti per garantire il massimo benessere del tuo cane.',
        
        // Carrello
        'cart.title': 'Il Tuo Carrello',
        'cart.empty': 'Il carrello è vuoto',
        'cart.continue': 'Continua lo Shopping',
        'cart.quantity': 'Quantità',
        'cart.subtotal': 'Subtotale',
        'cart.shipping': 'Spedizione',
        'cart.free': 'Gratuita',
        'cart.total': 'Totale',
        'cart.checkout': 'Procedi al Pagamento',
        'cart.remove': 'Rimuovi',
        'cart.choose': 'Scegli il tipo di acquisto:',
        'cart.single': 'Acquisto Singolo',
        'cart.subscription': 'Abbonamento - Risparmia 10%',
        'cart.secure': 'Pagamento sicuro con SSL',
        'cart.accept': 'Accettiamo:',
        
        // Chat
        'chat.title': 'Assistenza Chat',
        'chat.subtitle': 'Siamo qui per aiutarti',
        'chat.placeholder': 'Scrivi un messaggio...',
        'chat.send': 'Invia',
        'chat.welcome': 'Ciao! Come posso aiutarti oggi?',
        
        // FAQ
        'faq.title': 'Domande Frequenti',
        'faq.q1': 'Come conservo Pappa Fresh?',
        'faq.a1': 'Pappa Fresh va conservata in frigorifero e consumata entro 3-4 giorni dall\'apertura. Può essere congelata fino a 3 mesi.',
        'faq.q2': 'Quali sono i tempi di consegna?',
        'faq.a2': 'Consegniamo in 24-48 ore in tutta Italia con corriere refrigerato. Spedizione gratuita sopra i 39€.',
        'faq.q3': 'Che ingredienti utilizzate?',
        'faq.a3': 'Utilizziamo solo ingredienti freschi di qualità umana: carni fresche italiane, verdure di stagione, cereali integrali. Zero conservanti, coloranti o additivi artificiali.',
        'faq.q4': 'Come funziona l\'abbonamento?',
        'faq.a4': 'L\'abbonamento è flessibile e senza vincoli. Ricevi la pappa ogni 2 o 4 settimane con il 10% di sconto. Puoi modificare, mettere in pausa o cancellare quando vuoi.',
        'faq.q5': 'Posso cambiare ricetta?',
        'faq.a5': 'Certo! Puoi alternare le ricette ad ogni consegna per offrire varietà al tuo cane. Basta comunicarcelo prima della spedizione.',
        
        // Contatti
        'contact.title': 'Contattaci',
        'contact.subtitle': 'Siamo sempre disponibili per te e il tuo amico a quattro zampe',
        'contact.email': 'Email',
        'contact.phone': 'Telefono',
        'contact.address': 'Indirizzo',
        'contact.hours': 'Orari',
        'contact.hours.text': 'Lun-Ven: 9:00-18:00, Sab: 9:00-13:00',
        'contact.form.name': 'Nome',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Oggetto',
        'contact.form.message': 'Messaggio',
        'contact.form.send': 'Invia Messaggio',
        
        // Blog
        'blog.title': 'Il Blog di Pappa Fresh',
        'blog.subtitle': 'Consigli e curiosità sul mondo dei cani',
        'blog.readmore': 'Leggi di più',
        
        // Footer
        'footer.about': 'Chi Siamo',
        'footer.about.text': 'Pappa Fresh è il primo servizio italiano di cibo fresco per cani, preparato con ingredienti di qualità umana e consegnato a domicilio.',
        'footer.links': 'Link Utili',
        'footer.newsletter': 'Newsletter',
        'footer.newsletter.text': 'Iscriviti per ricevere consigli e offerte esclusive',
        'footer.newsletter.placeholder': 'La tua email',
        'footer.newsletter.button': 'Iscriviti',
        'footer.follow': 'Seguici',
        'footer.rights': 'Tutti i diritti riservati',
        
        // Notifiche
        'notify.added': 'Prodotto aggiunto al carrello!',
        'notify.removed': 'Prodotto rimosso dal carrello',
        'notify.updated': 'Carrello aggiornato',
        'notify.subscribe': 'Grazie per l\'iscrizione!',
        'notify.message': 'Messaggio inviato con successo!'
    },
    
    en: {
        // Navigation
        'nav.products': 'Products',
        'nav.trial': 'Trial Box',
        'nav.faq': 'FAQ',
        'nav.chat': 'Support',
        'nav.contact': 'Contact',
        'nav.blog': 'Blog',
        
        // Home
        'home.hero.title': 'Fresh dog food, delivered to your door',
        'home.hero.subtitle': 'Natural nutrition made with human-grade ingredients',
        'home.hero.cta': 'Calculate Perfect Plan',
        'home.why.title': 'Why choose Pappa Fresh?',
        'home.why.fresh': 'Fresh Ingredients',
        'home.why.fresh.text': 'Only fresh human-grade meats and vegetables',
        'home.why.vet': 'Vet Approved',
        'home.why.vet.text': 'Formulated with veterinary nutritionists',
        'home.why.delivery': 'Refrigerated Delivery',
        'home.why.delivery.text': 'Delivered fresh across Italy in 24-48 hours',
        'home.why.custom': 'Personalized Plan',
        'home.why.custom.text': 'Portions tailored to your dog\'s needs',
        
        // Trial Box
        'trial.title': 'Calculate the Perfect Plan for Your Dog',
        'trial.subtitle': 'Discover ideal portions and personalized nutrition plan',
        'trial.step1': 'Basic Information',
        'trial.step2': 'Health & Activity',
        'trial.step3': 'Your Plan',
        'trial.name': 'Dog\'s name',
        'trial.breed': 'Breed',
        'trial.weight': 'Current weight (kg)',
        'trial.age': 'Age',
        'trial.age.puppy': 'Puppy (2-12 months)',
        'trial.age.young': 'Young (1-2 years)',
        'trial.age.adult': 'Adult (3-7 years)',
        'trial.age.senior': 'Senior (8+ years)',
        'trial.activity': 'Activity level',
        'trial.activity.low': 'Low (quiet walks)',
        'trial.activity.moderate': 'Moderate (1-2 hours/day)',
        'trial.activity.high': 'High (very active, sports)',
        'trial.neutered': 'Neutered/Spayed?',
        'trial.yes': 'Yes',
        'trial.no': 'No',
        'trial.condition': 'Body condition',
        'trial.condition.underweight': 'Underweight',
        'trial.condition.ideal': 'Ideal weight',
        'trial.condition.overweight': 'Overweight',
        'trial.condition.obese': 'Obese',
        'trial.next': 'Next',
        'trial.back': 'Back',
        'trial.calculate': 'Calculate Plan',
        'trial.results.title': 'Perfect Plan for',
        'trial.results.calories': 'Daily calories',
        'trial.results.portions': 'Pappa Fresh pouches per day',
        'trial.results.monthly': 'Monthly pouches',
        'trial.results.recommendation': 'Recommended product',
        'trial.results.cta': 'Go to Products',
        
        // Products
        'products.title': 'Our Products',
        'products.subtitle': 'Balanced recipes for every need',
        'products.filter.all': 'All',
        'products.filter.puppy': 'Puppy',
        'products.filter.adult': 'Adult',
        'products.filter.senior': 'Senior',
        'products.filter.special': 'Special',
        'products.add': 'Add to Cart',
        'products.vet.title': 'Developed in our Veterinary Clinics',
        'products.vet.text': 'Each recipe has been developed and tested by our team of veterinary nutritionists to ensure your dog\'s maximum wellbeing.',
        
        // Cart
        'cart.title': 'Your Cart',
        'cart.empty': 'Your cart is empty',
        'cart.continue': 'Continue Shopping',
        'cart.quantity': 'Quantity',
        'cart.subtotal': 'Subtotal',
        'cart.shipping': 'Shipping',
        'cart.free': 'Free',
        'cart.total': 'Total',
        'cart.checkout': 'Proceed to Checkout',
        'cart.remove': 'Remove',
        'cart.choose': 'Choose purchase type:',
        'cart.single': 'Single Purchase',
        'cart.subscription': 'Subscription - Save 10%',
        'cart.secure': 'Secure payment with SSL',
        'cart.accept': 'We accept:',
        
        // Chat
        'chat.title': 'Chat Support',
        'chat.subtitle': 'We\'re here to help',
        'chat.placeholder': 'Type a message...',
        'chat.send': 'Send',
        'chat.welcome': 'Hello! How can I help you today?',
        
        // FAQ
        'faq.title': 'Frequently Asked Questions',
        'faq.q1': 'How do I store Pappa Fresh?',
        'faq.a1': 'Pappa Fresh should be stored in the refrigerator and consumed within 3-4 days of opening. It can be frozen for up to 3 months.',
        'faq.q2': 'What are the delivery times?',
        'faq.a2': 'We deliver in 24-48 hours throughout Italy with refrigerated courier. Free shipping over €39.',
        'faq.q3': 'What ingredients do you use?',
        'faq.a3': 'We only use fresh human-grade ingredients: fresh Italian meats, seasonal vegetables, whole grains. Zero preservatives, colorings or artificial additives.',
        'faq.q4': 'How does the subscription work?',
        'faq.a4': 'The subscription is flexible with no commitments. Receive food every 2 or 4 weeks with 10% discount. You can modify, pause or cancel anytime.',
        'faq.q5': 'Can I change recipes?',
        'faq.a5': 'Of course! You can alternate recipes with each delivery to offer variety to your dog. Just let us know before shipping.',
        
        // Contact
        'contact.title': 'Contact Us',
        'contact.subtitle': 'We\'re always available for you and your four-legged friend',
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.address': 'Address',
        'contact.hours': 'Hours',
        'contact.hours.text': 'Mon-Fri: 9:00-18:00, Sat: 9:00-13:00',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.send': 'Send Message',
        
        // Blog
        'blog.title': 'Pappa Fresh Blog',
        'blog.subtitle': 'Tips and curiosities about the dog world',
        'blog.readmore': 'Read more',
        
        // Footer
        'footer.about': 'About Us',
        'footer.about.text': 'Pappa Fresh is Italy\'s first fresh dog food service, prepared with human-grade ingredients and delivered to your door.',
        'footer.links': 'Useful Links',
        'footer.newsletter': 'Newsletter',
        'footer.newsletter.text': 'Subscribe for tips and exclusive offers',
        'footer.newsletter.placeholder': 'Your email',
        'footer.newsletter.button': 'Subscribe',
        'footer.follow': 'Follow Us',
        'footer.rights': 'All rights reserved',
        
        // Notifications
        'notify.added': 'Product added to cart!',
        'notify.removed': 'Product removed from cart',
        'notify.updated': 'Cart updated',
        'notify.subscribe': 'Thanks for subscribing!',
        'notify.message': 'Message sent successfully!'
    }
};

// ============================================
// PRODOTTI
// ============================================

const products = [
    {
        id: 1,
        name: {
            it: 'Pappa Fresh Pollo',
            en: 'Pappa Fresh Chicken'
        },
        description: {
            it: 'Pollo fresco italiano con verdure di stagione e riso integrale',
            en: 'Fresh Italian chicken with seasonal vegetables and brown rice'
        },
        longDescription: {
            it: 'Ricetta bilanciata con pollo allevato a terra, carote, zucchine e riso integrale. Perfetta per cani adulti con normale attività.',
            en: 'Balanced recipe with free-range chicken, carrots, zucchini and brown rice. Perfect for adult dogs with normal activity.'
        },
        price: 4.90,
        weight: '400g',
        category: 'adult',
        calories: 560,
        protein: 26,
        fat: 14,
        fiber: 3,
        image: 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?w=400&h=300&fit=crop',
        ingredients: {
            it: 'Pollo (65%), Verdure (20%), Riso integrale (10%), Olio di salmone, Minerali, Vitamine',
            en: 'Chicken (65%), Vegetables (20%), Brown rice (10%), Salmon oil, Minerals, Vitamins'
        }
    },
    {
        id: 2,
        name: {
            it: 'Pappa Fresh Manzo',
            en: 'Pappa Fresh Beef'
        },
        description: {
            it: 'Manzo italiano con patate dolci e piselli',
            en: 'Italian beef with sweet potatoes and peas'
        },
        longDescription: {
            it: 'Formula ad alto contenuto proteico con manzo grass-fed, ideale per cani attivi e sportivi.',
            en: 'High protein formula with grass-fed beef, ideal for active and sporting dogs.'
        },
        price: 5.50,
        weight: '400g',
        category: 'adult',
        calories: 600,
        protein: 28,
        fat: 16,
        fiber: 2.5,
        image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&h=300&fit=crop',
        ingredients: {
            it: 'Manzo (60%), Patate dolci (20%), Piselli (10%), Carote, Olio di cocco, Minerali, Vitamine',
            en: 'Beef (60%), Sweet potatoes (20%), Peas (10%), Carrots, Coconut oil, Minerals, Vitamins'
        }
    },
    {
        id: 3,
        name: {
            it: 'Pappa Fresh Salmone',
            en: 'Pappa Fresh Salmon'
        },
        description: {
            it: 'Salmone norvegese con quinoa e spinaci',
            en: 'Norwegian salmon with quinoa and spinach'
        },
        longDescription: {
            it: 'Ricetta ipoallergenica ricca di Omega-3, perfetta per cani con pelle sensibile.',
            en: 'Hypoallergenic recipe rich in Omega-3, perfect for dogs with sensitive skin.'
        },
        price: 5.90,
        weight: '400g',
        category: 'special',
        calories: 540,
        protein: 24,
        fat: 15,
        fiber: 3,
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
        ingredients: {
            it: 'Salmone (55%), Quinoa (15%), Spinaci (10%), Zucca, Mirtilli, Olio di lino, Minerali, Vitamine',
            en: 'Salmon (55%), Quinoa (15%), Spinach (10%), Pumpkin, Blueberries, Flaxseed oil, Minerals, Vitamins'
        }
    },
    {
        id: 4,
        name: {
            it: 'Pappa Fresh Puppy',
            en: 'Pappa Fresh Puppy'
        },
        description: {
            it: 'Agnello e tacchino per cuccioli in crescita',
            en: 'Lamb and turkey for growing puppies'
        },
        longDescription: {
            it: 'Formula speciale arricchita con DHA per lo sviluppo cerebrale e calcio per ossa forti.',
            en: 'Special formula enriched with DHA for brain development and calcium for strong bones.'
        },
        price: 5.50,
        weight: '400g',
        category: 'puppy',
        calories: 620,
        protein: 30,
        fat: 18,
        fiber: 2,
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
        ingredients: {
            it: 'Agnello (40%), Tacchino (25%), Riso, Carote, Zucchine, Olio di salmone, DHA, Calcio, Vitamine',
            en: 'Lamb (40%), Turkey (25%), Rice, Carrots, Zucchini, Salmon oil, DHA, Calcium, Vitamins'
        }
    },
    {
        id: 5,
        name: {
            it: 'Pappa Fresh Senior',
            en: 'Pappa Fresh Senior'
        },
        description: {
            it: 'Tacchino leggero per cani anziani',
            en: 'Light turkey for senior dogs'
        },
        longDescription: {
            it: 'Formula delicata con glucosamina per le articolazioni e antiossidanti per il sistema immunitario.',
            en: 'Gentle formula with glucosamine for joints and antioxidants for immune system.'
        },
        price: 5.20,
        weight: '400g',
        category: 'senior',
        calories: 480,
        protein: 22,
        fat: 12,
        fiber: 4,
        image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=300&fit=crop',
        ingredients: {
            it: 'Tacchino (55%), Patate, Carote, Mele, Glucosamina, Condroitina, Antiossidanti, Vitamine',
            en: 'Turkey (55%), Potatoes, Carrots, Apples, Glucosamine, Chondroitin, Antioxidants, Vitamins'
        }
    },
    {
        id: 6,
        name: {
            it: 'Pappa Fresh Light',
            en: 'Pappa Fresh Light'
        },
        description: {
            it: 'Formula ipocalorica per controllo del peso',
            en: 'Low-calorie formula for weight control'
        },
        longDescription: {
            it: 'Ricetta bilanciata con meno calorie ma tutti i nutrienti essenziali, arricchita con L-carnitina.',
            en: 'Balanced recipe with fewer calories but all essential nutrients, enriched with L-carnitine.'
        },
        price: 4.70,
        weight: '400g',
        category: 'special',
        calories: 420,
        protein: 25,
        fat: 8,
        fiber: 5,
        image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop',
        ingredients: {
            it: 'Pollo (50%), Verdure miste (30%), Crusca d\'avena, L-carnitina, Fibre prebiotiche, Vitamine',
            en: 'Chicken (50%), Mixed vegetables (30%), Oat bran, L-carnitine, Prebiotic fibers, Vitamins'
        }
    }
];

// ============================================
// FUNZIONI LINGUA
// ============================================

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('pappa-lang', lang);
    updatePageLanguage();
}

function t(key) {
    return translations[currentLang][key] || key;
}

function updatePageLanguage() {
    // Aggiorna tutti gli elementi con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    
    // Aggiorna placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    
    // Aggiorna lang HTML
    document.documentElement.lang = currentLang;
    
    // Aggiorna switch lingua attivo
    document.querySelectorAll('.lang-switch').forEach(el => {
        el.classList.toggle('active', el.dataset.lang === currentLang);
    });
    
    // Ricarica contenuti dinamici se necessario
    const page = document.body.dataset.page;
    if (page === 'products') {
        loadProducts();
    } else if (page === 'cart') {
        loadCartItems();
    } else if (page === 'blog') {
        loadBlogPosts();
    }
}

// ============================================
// CALCOLATORE NUTRIZIONALE
// ============================================

function calculateDailyCalories(data) {
    const weight = parseFloat(data.weight);
    
    // Formula RER (Resting Energy Requirement)
    let RER = 70 * Math.pow(weight, 0.75);
    
    // Moltiplicatore basato su età
    let ageFactor = 1.0;
    switch(data.age) {
        case 'puppy': ageFactor = 3.0; break;
        case 'young': ageFactor = 2.0; break;
        case 'adult': ageFactor = 1.6; break;
        case 'senior': ageFactor = 1.4; break;
    }
    
    // Moltiplicatore attività
    let activityFactor = 1.0;
    switch(data.activity) {
        case 'low': activityFactor = 0.8; break;
        case 'moderate': activityFactor = 1.0; break;
        case 'high': activityFactor = 1.3; break;
    }
    
    // Sterilizzazione
    let neuteredFactor = data.neutered === 'yes' ? 0.8 : 1.0;
    
    // Condizione corporea
    let conditionFactor = 1.0;
    switch(data.bodyCondition) {
        case 'underweight': conditionFactor = 1.2; break;
        case 'ideal': conditionFactor = 1.0; break;
        case 'overweight': conditionFactor = 0.8; break;
        case 'obese': conditionFactor = 0.7; break;
    }
    
    // Calcolo calorie totali
    const dailyCalories = Math.round(RER * ageFactor * activityFactor * neuteredFactor * conditionFactor);
    
    return dailyCalories;
}

function calculatePappaFreshPortions(dailyCalories) {
    const caloriesPerPouch = 560; // Media calorie per bustina
    const pouches = dailyCalories / caloriesPerPouch;
    const roundedPouches = Math.round(pouches * 4) / 4; // Arrotonda al quarto più vicino
    
    return {
        exact: pouches,
        recommended: roundedPouches,
        display: formatPouches(roundedPouches),
        monthly: Math.ceil(roundedPouches * 30)
    };
}

function formatPouches(pouches) {
    const whole = Math.floor(pouches);
    const fraction = pouches - whole;
    
    if (fraction === 0) return whole.toString();
    if (fraction === 0.25) return whole ? `${whole}¼` : '¼';
    if (fraction === 0.5) return whole ? `${whole}½` : '½';
    if (fraction === 0.75) return whole ? `${whole}¾` : '¾';
    
    return pouches.toFixed(1);
}

function getRecommendedProduct(data) {
    if (data.age === 'puppy') {
        return products.find(p => p.category === 'puppy');
    } else if (data.age === 'senior') {
        return products.find(p => p.category === 'senior');
    } else if (data.bodyCondition === 'overweight' || data.bodyCondition === 'obese') {
        return products.find(p => p.name.it.includes('Light'));
    } else if (data.activity === 'high') {
        return products.find(p => p.name.it.includes('Manzo'));
    } else {
        return products.find(p => p.name.it.includes('Pollo'));
    }
}

// ============================================
// GESTIONE CALCOLATORE UI
// ============================================

function initCalculator() {
    const form = document.getElementById('calculator-form');
    if (!form) return;
    
    // Gestione step
    let currentStep = 1;
    const totalSteps = 3;
    
    function showStep(step) {
        document.querySelectorAll('.calculator-step').forEach(s => {
            s.classList.remove('active');
        });
        document.getElementById(`step-${step}`).classList.add('active');
        
        // Aggiorna indicatori
        document.querySelectorAll('.step').forEach((s, index) => {
            if (index + 1 < step) {
                s.classList.add('completed');
            } else if (index + 1 === step) {
                s.classList.add('active');
            } else {
                s.classList.remove('active', 'completed');
            }
        });
        
        currentStep = step;
    }
    
    // Navigazione
    document.getElementById('next-step-1')?.addEventListener('click', () => {
        if (validateStep1()) {
            showStep(2);
        }
    });
    
    document.getElementById('next-step-2')?.addEventListener('click', () => {
        if (validateStep2()) {
            calculateAndShowResults();
            showStep(3);
            showRecommendedProduct();
        }
    });
    
    document.getElementById('back-step-2')?.addEventListener('click', () => showStep(1));
    document.getElementById('back-step-3')?.addEventListener('click', () => showStep(2));
    
    function validateStep1() {
        const name = document.getElementById('dog-name').value;
        const breed = document.getElementById('dog-breed').value;
        const weight = document.getElementById('dog-weight').value;
        const age = document.getElementById('dog-age').value;
        
        if (!name || !breed || !weight || !age) {
            showNotification('Compila tutti i campi', 'warning');
            return false;
        }
        
        calculatorData = {
            ...calculatorData,
            name, breed, weight, age
        };
        
        return true;
    }
    
    function validateStep2() {
        const activity = document.getElementById('dog-activity').value;
        const neutered = document.querySelector('input[name="dog-neutered"]:checked')?.value;
        const bodyCondition = document.getElementById('dog-condition').value;
        
        if (!activity || !neutered || !bodyCondition) {
            showNotification('Compila tutti i campi', 'warning');
            return false;
        }
        
        calculatorData = {
            ...calculatorData,
            activity, neutered, bodyCondition
        };
        
        return true;
    }
    
    function calculateAndShowResults() {
        const dailyCalories = calculateDailyCalories(calculatorData);
        const portions = calculatePappaFreshPortions(dailyCalories);
        const recommendedProduct = getRecommendedProduct(calculatorData);
        
        // Mostra risultati
        document.getElementById('result-dog-name').textContent = calculatorData.name;
        document.getElementById('result-calories').textContent = dailyCalories;
        document.getElementById('result-portions').textContent = portions.display;
        document.getElementById('result-monthly').textContent = portions.monthly;
        
        // Calcola costo mensile
        const monthlyCost = portions.monthly * recommendedProduct.price;
        const element = document.getElementById('result-cost');
        if (element) {
            element.textContent = monthlyCost.toFixed(0);
        }
        
        calculatorData.results = {
            dailyCalories,
            portions,
            recommendedProduct
        };
    }
    
    function showRecommendedProduct() {
        const container = document.getElementById('recommended-product-container');
        if (!container || !calculatorData.results) return;
        
        const product = calculatorData.results.recommendedProduct;
        const portions = calculatorData.results.portions;
        
        // Mostra prodotto consigliato
        container.innerHTML = `
            <div class="card border-primary border-2">
                <div class="card-body">
                    <h4 class="mb-4"><i class="bi bi-star-fill text-warning me-2"></i>Prodotto Consigliato per ${calculatorData.name}</h4>
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${product.image}" class="img-fluid rounded" alt="${product.name[currentLang]}">
                        </div>
                        <div class="col-md-8">
                            <h3 class="text-primary">${product.name[currentLang]}</h3>
                            <p class="fs-5">${product.description[currentLang]}</p>
                            <p>${product.longDescription[currentLang]}</p>
                            
                            <div class="row mb-3">
                                <div class="col-md-4">
                                    <small class="text-muted">Proteine</small>
                                    <div class="fw-bold">${product.protein}%</div>
                                </div>
                                <div class="col-md-4">
                                    <small class="text-muted">Grassi</small>
                                    <div class="fw-bold">${product.fat}%</div>
                                </div>
                                <div class="col-md-4">
                                    <small class="text-muted">Calorie</small>
                                    <div class="fw-bold">${product.calories} cal</div>
                                </div>
                            </div>
                            
                            <p class="mb-2"><strong>Ingredienti:</strong> ${product.ingredients[currentLang]}</p>
                            
                            <div class="alert alert-info">
                                <i class="bi bi-info-circle me-2"></i>
                                Per ${calculatorData.name} consigliamo <strong>${portions.display} bustine al giorno</strong> 
                                (${portions.monthly} bustine al mese)
                            </div>
                            
                            <div class="row mt-4">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body text-center">
                                            <h5>Prezzo</h5>
                                            <p class="display-6 text-primary">€${product.price.toFixed(2)}</p>
                                            <p class="text-muted">per bustina</p>
                                            <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">
                                                <i class="bi bi-cart-plus"></i> Aggiungi al Carrello
                                            </button>
                                            <small class="text-muted mt-2 d-block">
                                                Scegli tra acquisto singolo o abbonamento nel carrello
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Mostra altri prodotti
        showOtherProducts(product.id);
    }
    
    function showOtherProducts(excludeId) {
        const container = document.getElementById('other-products-container');
        if (!container) return;
        
        const otherProducts = products.filter(p => p.id !== excludeId).slice(0, 3);
        
        container.innerHTML = `
            <h4 class="mb-4">Altri Prodotti</h4>
            <div class="row">
                ${otherProducts.map(product => `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <img src="${product.image}" class="card-img-top" alt="${product.name[currentLang]}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name[currentLang]}</h5>
                                <p class="card-text">${product.description[currentLang]}</p>
                                <div class="price-tag">€${product.price.toFixed(2)}</div>
                                <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">
                                    <i class="bi bi-cart-plus"></i> ${t('products.add')}
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Inizializza primo step
    showStep(1);
}

// ============================================
// GESTIONE CARRELLO
// ============================================

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.classList.remove('d-none');
    } else {
        badge.classList.add('d-none');
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name[currentLang],
            price: product.price,
            image: product.image,
            weight: product.weight,
            quantity: 1
        });
    }
    
    localStorage.setItem('pappa-cart', JSON.stringify(cart));
    updateCartBadge();
    showNotification(t('notify.added'), 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('pappa-cart', JSON.stringify(cart));
    updateCartBadge();
    loadCartItems();
    showNotification(t('notify.removed'), 'info');
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    if (newQuantity > 0) {
        item.quantity = newQuantity;
    } else {
        removeFromCart(productId);
        return;
    }
    
    localStorage.setItem('pappa-cart', JSON.stringify(cart));
    updateCartBadge();
    loadCartItems();
}

// ============================================
// CARICAMENTO PRODOTTI
// ============================================

function loadProducts(filter = 'all') {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    // Controlla se veniamo dal calcolatore
    const urlParams = new URLSearchParams(window.location.search);
    const fromCalculator = urlParams.get('fromCalculator') === 'true';
    const calculatorData = JSON.parse(localStorage.getItem('pappa-calculator-data') || '{}');
    
    let recommendedProductId = null;
    if (fromCalculator && calculatorData.results) {
        recommendedProductId = calculatorData.results.recommendedProduct.id;
        
        // Mostra piano nutrizionale
        showNutritionPlan(calculatorData);
    }
    
    container.innerHTML = filteredProducts.map(product => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card product-card ${product.id === recommendedProductId ? 'border-primary border-2' : ''}">
                ${product.id === recommendedProductId ? '<div class="product-badge">Consigliato per ' + calculatorData.name + '</div>' : ''}
                <img src="${product.image}" class="card-img-top" alt="${product.name[currentLang]}">
                <div class="card-body">
                    <h5 class="card-title">${product.name[currentLang]}</h5>
                    <p class="card-text">${product.description[currentLang]}</p>
                    <p class="text-muted mb-2">
                        <i class="bi bi-box-seam me-1"></i>${product.weight} 
                        <i class="bi bi-fire ms-3 me-1"></i>${product.calories} cal
                        <i class="bi bi-heart-pulse ms-3 me-1"></i>${product.protein}% proteine
                    </p>
                    <div class="price-tag">€${product.price.toFixed(2)}</div>
                    <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">
                        <i class="bi bi-cart-plus"></i> ${t('products.add')}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function showNutritionPlan(data) {
    const planSection = document.getElementById('nutrition-plan-section');
    if (!planSection) return;
    
    planSection.style.display = 'block';
    planSection.innerHTML = `
        <div class="nutrition-card">
            <h3 class="text-white mb-4">${t('trial.results.title')} ${data.name}</h3>
            <div class="row">
                <div class="col-md-3">
                    <div class="nutrition-metric">
                        <div class="nutrition-value">${data.results.dailyCalories}</div>
                        <div class="nutrition-label">${t('trial.results.calories')}</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="nutrition-metric">
                        <div class="nutrition-value">${data.results.portions.display}</div>
                        <div class="nutrition-label">${t('trial.results.portions')}</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="nutrition-metric">
                        <div class="nutrition-value">${data.results.portions.monthly}</div>
                        <div class="nutrition-label">${t('trial.results.monthly')}</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="nutrition-metric">
                        <div class="nutrition-value">€${(data.results.portions.monthly * 4.90).toFixed(0)}</div>
                        <div class="nutrition-label">Costo mensile stimato</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// CARICAMENTO CARRELLO - FUNZIONE AGGIORNATA
// ============================================

function loadCartItems() {
    const container = document.getElementById('cart-items-container');
    const tableBody = document.getElementById('cart-items-body');
    const emptyCart = document.getElementById('empty-cart');
    const orderSummaryCard = document.getElementById('order-summary-card');
    const continueBtn = document.getElementById('continue-shopping-btn');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        if (orderSummaryCard) orderSummaryCard.style.display = 'none';
        if (continueBtn) continueBtn.style.display = 'none';
    } else {
        container.style.display = 'block';
        if (emptyCart) emptyCart.style.display = 'none';
        if (orderSummaryCard) orderSummaryCard.style.display = 'block';
        if (continueBtn) continueBtn.style.display = 'block';
        
        // Popola la tabella
        if (tableBody) {
            tableBody.innerHTML = cart.map(item => `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${item.image}" class="cart-item-image me-3" alt="${item.name}">
                            <div>
                                <h6 class="mb-0">${item.name}</h6>
                                <small class="text-muted">${item.weight}</small>
                            </div>
                        </div>
                    </td>
                    <td>€${item.price.toFixed(2)}</td>
                    <td>
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                                <i class="bi bi-dash"></i>
                            </button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                    </td>
                    <td class="fw-bold">€${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        }
        
        updateOrderSummary();
    }
}

function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 39 ? 0 : 4.90;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `€${subtotal.toFixed(2)}`;
    document.getElementById('shipping-cost').textContent = shipping === 0 ? t('cart.free') : `€${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `€${total.toFixed(2)}`;
}

// ============================================
// CHECKOUT
// ============================================

function loadCheckoutData() {
    const container = document.getElementById('checkout-items');
    if (!container) return;
    
    // Get purchase type from URL
    const urlParams = new URLSearchParams(window.location.search);
    const purchaseType = urlParams.get('type') || 'single';
    const isSubscription = purchaseType === 'subscription';
    
    // Update purchase type alert
    const alertText = document.getElementById('purchase-type-text');
    const discountRow = document.getElementById('discount-row');
    if (alertText) {
        if (isSubscription) {
            alertText.textContent = 'Abbonamento - Risparmia il 10% su ogni consegna';
            document.getElementById('purchase-type-alert').classList.replace('alert-info', 'alert-success');
            if (discountRow) discountRow.style.display = 'flex';
        } else {
            alertText.textContent = 'Acquisto Singolo';
            if (discountRow) discountRow.style.display = 'none';
        }
    }
    
    // Load cart items
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    // Display items
    container.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.name}" class="rounded me-3" style="width: 60px; height: 60px; object-fit: cover;">
                <div>
                    <div class="fw-bold">${item.name}</div>
                    <small class="text-muted">${item.quantity} x €${item.price.toFixed(2)}</small>
                </div>
            </div>
            <div class="fw-bold">€${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = isSubscription ? subtotal * 0.1 : 0;
    const shipping = (subtotal - discount) >= 39 ? 0 : 4.90;
    const total = subtotal - discount + shipping;
    
    // Update totals
    document.getElementById('checkout-subtotal').textContent = `€${subtotal.toFixed(2)}`;
    if (isSubscription) {
        document.getElementById('checkout-discount').textContent = `-€${discount.toFixed(2)}`;
    }
    document.getElementById('checkout-shipping').textContent = shipping === 0 ? 'Gratuita' : `€${shipping.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `€${total.toFixed(2)}`;
    
    // Store total for payment processing
    window.checkoutTotal = total;
    window.isSubscription = isSubscription;
}

async function processPayment() {
    // Validate form
    const shippingForm = document.getElementById('shipping-form');
    const termsCheckbox = document.getElementById('terms');
    
    if (!shippingForm.checkValidity()) {
        shippingForm.reportValidity();
        return;
    }
    
    if (!termsCheckbox.checked) {
        alert('Devi accettare i Termini e Condizioni per procedere.');
        return;
    }
    
    // Get active payment method
    const activeTab = document.querySelector('.tab-pane.active').id;
    
    // Show loading state
    const button = document.getElementById('complete-order');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');
    
    button.disabled = true;
    buttonText.textContent = 'Elaborazione...';
    spinner.classList.remove('d-none');
    
    try {
        if (activeTab === 'card') {
            // Process Stripe card payment
            await processStripePayment();
        } else if (activeTab === 'paypal') {
            // Redirect to PayPal
            processPayPalPayment();
        } else if (activeTab === 'link') {
            // Process Stripe Link payment
            await processStripeLinkPayment();
        }
    } catch (error) {
        console.error('Payment error:', error);
        alert('Errore nel pagamento. Riprova.');
        
        // Reset button
        button.disabled = false;
        buttonText.textContent = 'Completa Ordine';
        spinner.classList.add('d-none');
    }
}

async function processStripePayment() {
    // Questo richiederà un backend per creare un Payment Intent
    // Per ora simuliamo il successo
    
    // In produzione, qui dovresti:
    // 1. Chiamare il tuo backend per creare un Payment Intent
    // 2. Confermare il pagamento con Stripe
    // 3. Gestire il risultato
    
    // Simulazione per demo
    setTimeout(() => {
        // Salva i dati dell'ordine
        const orderData = {
            items: cart,
            total: window.checkoutTotal,
            isSubscription: window.isSubscription,
            shipping: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postalCode').value,
                province: document.getElementById('province').value,
                notes: document.getElementById('notes').value
            },
            timestamp: new Date().toISOString()
        };
        
        // Salva l'ordine nel localStorage (in produzione andrà nel database)
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        
        // Redirect alla pagina di successo
        window.location.href = 'order-success.html';
    }, 2000);
}

function processPayPalPayment() {
    // In produzione, qui integreresti PayPal SDK
    // Per ora simuliamo il redirect
    alert('Redirect a PayPal in corso...');
    
    // Simulazione
    setTimeout(() => {
        window.location.href = 'order-success.html';
    }, 1000);
}

async function processStripeLinkPayment() {
    const linkEmail = document.getElementById('linkEmail').value;
    
    if (!linkEmail) {
        alert('Inserisci un\'email per utilizzare Stripe Link');
        return;
    }
    
    // In produzione, qui integreresti Stripe Link
    // Per ora simuliamo il successo
    setTimeout(() => {
        window.location.href = 'order-success.html';
    }, 2000);
}

// ============================================
// CHAT
// ============================================

function initChat() {
    const form = document.getElementById('chat-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        addChatMessage(message, 'user');
        input.value = '';
        
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            const response = getChatResponse(message);
            addChatMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    });
}

function addChatMessage(text, sender) {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = text;
    
    messageDiv.appendChild(content);
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typing-indicator';
    
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    
    typingDiv.appendChild(indicator);
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

function getChatResponse(message) {
    const msg = message.toLowerCase();
    
    // Database FAQ basato sulle nostre domande frequenti
    const faqDatabase = {
        conservazione: {
            keywords: ['conserv', 'frigo', 'congel', 'scad'],
            response: {
                it: 'Pappa Fresh va conservata in frigorifero e consumata entro 3-4 giorni dall\'apertura. Può essere congelata fino a 3 mesi in freezer.',
                en: 'Pappa Fresh should be stored in the refrigerator and consumed within 3-4 days of opening. It can be frozen for up to 3 months.'
            }
        },
        spedizione: {
            keywords: ['sped', 'consegn', 'temp', 'arriv', 'deliver'],
            response: {
                it: 'Consegniamo in 24-48 ore in tutta Italia con corriere refrigerato. Spedizione gratuita sopra i 39€, altrimenti costa 4,90€.',
                en: 'We deliver in 24-48 hours throughout Italy with refrigerated courier. Free shipping over €39, otherwise €4.90.'
            }
        },
        ingredienti: {
            keywords: ['ingredient', 'contien', 'compos', 'cosa c'],
            response: {
                it: 'Utilizziamo solo ingredienti freschi di qualità umana: carni fresche italiane, verdure di stagione, cereali integrali. Zero conservanti, coloranti o additivi artificiali.',
                en: 'We only use fresh human-grade ingredients: fresh Italian meats, seasonal vegetables, whole grains. Zero preservatives, colorings or artificial additives.'
            }
        },
        abbonamento: {
            keywords: ['abbonam', 'subscri', 'risparmi', 'scont'],
            response: {
                it: 'L\'abbonamento è flessibile e senza vincoli. Ricevi la pappa ogni 2 o 4 settimane con il 10% di sconto. Puoi modificare, mettere in pausa o cancellare quando vuoi.',
                en: 'The subscription is flexible with no commitments. Receive food every 2 or 4 weeks with 10% discount. You can modify, pause or cancel anytime.'
            }
        },
        porzioni: {
            keywords: ['porzion', 'quant', 'gramm', 'bustine', 'calcol'],
            response: {
                it: 'Le porzioni dipendono da peso, età e attività del cane. Usa il nostro calcolatore nella sezione "Box Prova" per determinare le porzioni esatte personalizzate per il tuo cane.',
                en: 'Portions depend on dog\'s weight, age and activity. Use our calculator in the "Trial Box" section to determine exact personalized portions for your dog.'
            }
        },
        cambioRicetta: {
            keywords: ['cambi', 'ricett', 'vari', 'altern'],
            response: {
                it: 'Certo! Puoi alternare le ricette ad ogni consegna per offrire varietà al tuo cane. Basta comunicarcelo prima della spedizione dal tuo account.',
                en: 'Of course! You can alternate recipes with each delivery to offer variety to your dog. Just let us know before shipping from your account.'
            }
        },
        transizione: {
            keywords: ['transizion', 'passar', 'cambio', 'crocchett', 'inizi'],
            response: {
                it: 'La transizione dal cibo secco a Pappa Fresh deve essere graduale in 7-10 giorni. Inizia con 25% di Pappa Fresh e 75% del cibo abituale, aumentando gradualmente la percentuale.',
                en: 'The transition from dry food to Pappa Fresh should be gradual over 7-10 days. Start with 25% Pappa Fresh and 75% regular food, gradually increasing the percentage.'
            }
        },
        allergie: {
            keywords: ['allerg', 'intolleran', 'sensibil'],
            response: {
                it: 'Abbiamo ricette ipoallergeniche come Salmone e Quinoa, perfette per cani con sensibilità alimentari. Consulta sempre il tuo veterinario per allergie specifiche.',
                en: 'We have hypoallergenic recipes like Salmon and Quinoa, perfect for dogs with food sensitivities. Always consult your vet for specific allergies.'
            }
        },
        spedizioneItalia: {
            keywords: ['italia', 'isol', 'sicilia', 'sardegna'],
            response: {
                it: 'Sì, consegniamo in tutta Italia incluse le isole. I tempi possono variare da 24 ore per le città principali a 48-72 ore per le zone più remote.',
                en: 'Yes, we deliver throughout Italy including islands. Times can vary from 24 hours for major cities to 48-72 hours for remote areas.'
            }
        },
        pausa: {
            keywords: ['paus', 'ferma', 'stop', 'sospend'],
            response: {
                it: 'Puoi mettere in pausa l\'abbonamento in qualsiasi momento dal tuo account o contattando il servizio clienti. La pausa può durare fino a 3 mesi.',
                en: 'You can pause the subscription anytime from your account or by contacting customer service. The pause can last up to 3 months.'
            }
        }
    };
    
    // Cerca corrispondenza nelle FAQ
    for (const faq of Object.values(faqDatabase)) {
        for (const keyword of faq.keywords) {
            if (msg.includes(keyword)) {
                return faq.response[currentLang];
            }
        }
    }
    
    // Risposta di default se non trova corrispondenze
    const defaultResponse = {
        it: 'Mi dispiace, non ho trovato una risposta specifica alla tua domanda nelle nostre FAQ. Ti consiglio di consultare la pagina FAQ completa o contattare il nostro servizio clienti al +39 02 1234567 o via email a info@pappafresh.it.',
        en: 'I\'m sorry, I couldn\'t find a specific answer to your question in our FAQs. I suggest checking the complete FAQ page or contacting our customer service at +39 02 1234567 or via email at info@pappafresh.it.'
    };
    
    return defaultResponse[currentLang];
}

// ============================================
// BLOG
// ============================================

const blogPosts = [
    {
        id: 1,
        title: {
            it: 'Come passare al cibo fresco',
            en: 'How to transition to fresh food'
        },
        excerpt: {
            it: 'Una guida completa per passare gradualmente dal cibo secco a Pappa Fresh...',
            en: 'A complete guide to gradually transition from dry food to Pappa Fresh...'
        },
        category: {
            it: 'Nutrizione',
            en: 'Nutrition'
        },
        date: '2024-01-15',
        image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        title: {
            it: 'I benefici del cibo fresco',
            en: 'Benefits of fresh food'
        },
        excerpt: {
            it: 'Scopri perché sempre più veterinari consigliano l\'alimentazione fresca...',
            en: 'Discover why more and more vets recommend fresh feeding...'
        },
        category: {
            it: 'Salute',
            en: 'Health'
        },
        date: '2024-01-10',
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        title: {
            it: 'Razze e alimentazione',
            en: 'Breeds and nutrition'
        },
        excerpt: {
            it: 'Ogni razza ha esigenze nutrizionali diverse. Scopri quelle del tuo cane...',
            en: 'Each breed has different nutritional needs. Discover your dog\'s...'
        },
        category: {
            it: 'Guide',
            en: 'Guides'
        },
        date: '2024-01-05',
        image: 'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?w=400&h=300&fit=crop'
    }
];

function loadBlogPosts() {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;
    
    container.innerHTML = blogPosts.map(post => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card blog-card">
                <img src="${post.image}" class="card-img-top" alt="${post.title[currentLang]}">
                <div class="card-body">
                    <span class="blog-category">${post.category[currentLang]}</span>
                    <h5 class="card-title">${post.title[currentLang]}</h5>
                    <p class="card-text">${post.excerpt[currentLang]}</p>
                    <p class="blog-meta">
                        <i class="bi bi-calendar me-2"></i>${formatDate(post.date)}
                    </p>
                    <a href="#" class="btn btn-outline-primary">
                        ${t('blog.readmore')} <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// UTILITIES
// ============================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(currentLang === 'it' ? 'it-IT' : 'en-US', options);
}

function subscribeNewsletter(event) {
    event.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    if (email) {
        showNotification(t('notify.subscribe'), 'success');
        document.getElementById('newsletter-email').value = '';
    }
}

function sendContactMessage(event) {
    event.preventDefault();
    showNotification(t('notify.message'), 'success');
    document.getElementById('contact-form').reset();
}

// ============================================
// INIZIALIZZAZIONE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inizializza lingua
    updatePageLanguage();
    
    // Event listener switch lingua
    document.querySelectorAll('.lang-switch').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
    
    // Aggiorna badge carrello
    updateCartBadge();
    
    // Inizializzazione pagina specifica
    const page = document.body.dataset.page;
    
    switch(page) {
        case 'home':
            // Animazioni homepage se necessario
            break;
            
        case 'trial':
            initCalculator();
            break;
            
        case 'products':
            loadProducts();
            
            // Filter buttons
            document.querySelectorAll('[data-filter]').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    loadProducts(this.dataset.filter);
                });
            });
            break;
            
        case 'cart':
            loadCartItems();
            break;
            
        case 'checkout':
            loadCheckoutData();
            break;
            
        case 'chat':
            initChat();
            break;
            
        case 'blog':
            loadBlogPosts();
            break;
            
        case 'contact':
            document.getElementById('contact-form')?.addEventListener('submit', sendContactMessage);
            break;
    }
    
    // Newsletter form
    document.getElementById('newsletter-form')?.addEventListener('submit', subscribeNewsletter);
});