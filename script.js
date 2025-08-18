// Pappa Fresh - Main JavaScript File

// Global variables
let currentStep = 1;
let calculatorData = {};
let currentLanguage = 'it';
let cart = JSON.parse(localStorage.getItem('pappa-cart') || '[]');

// Product catalog with new products
const products = [
    {
        id: 1,
        name: 'PappaFresh Manzo',
        nameEn: 'PappaFresh Beef',
        price: 6.66,
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
        description: 'Manzo fresco italiano con verdure di stagione',
        descriptionEn: 'Fresh Italian beef with seasonal vegetables',
        category: 'adult',
        weight: '400g',
        caloriesPer100g: 130,
        ingredients: ['Manzo fresco 60%', 'Carote', 'Zucchine', 'Riso integrale'],
        ingredientsEn: ['Fresh beef 60%', 'Carrots', 'Zucchini', 'Brown rice']
    },
    {
        id: 2,
        name: 'PappaFresh Pollo',
        nameEn: 'PappaFresh Chicken',
        price: 6.66,
        image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop',
        description: 'Pollo ruspante con patate dolci e spinaci',
        descriptionEn: 'Free-range chicken with sweet potatoes and spinach',
        category: 'adult',
        weight: '400g',
        caloriesPer100g: 120,
        ingredients: ['Pollo ruspante 65%', 'Patate dolci', 'Spinaci', 'Quinoa'],
        ingredientsEn: ['Free-range chicken 65%', 'Sweet potatoes', 'Spinach', 'Quinoa']
    },
    {
        id: 3,
        name: 'PappaFresh Tacchino',
        nameEn: 'PappaFresh Turkey',
        price: 6.66,
        image: 'https://images.unsplash.com/photo-1574781330855-d0db2706b3d0?w=400&h=300&fit=crop',
        description: 'Tacchino magro con zucca e broccoli',
        descriptionEn: 'Lean turkey with pumpkin and broccoli',
        category: 'adult',
        weight: '400g',
        caloriesPer100g: 110,
        ingredients: ['Tacchino 60%', 'Zucca', 'Broccoli', 'Orzo perlato'],
        ingredientsEn: ['Turkey 60%', 'Pumpkin', 'Broccoli', 'Pearl barley']
    },
    {
        id: 4,
        name: 'PappaFresh Equino',
        nameEn: 'PappaFresh Horse',
        price: 6.66,
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
        description: 'Carne equina ipoallergenica con verdure miste',
        descriptionEn: 'Hypoallergenic horse meat with mixed vegetables',
        category: 'special',
        weight: '400g',
        caloriesPer100g: 140,
        ingredients: ['Carne equina 60%', 'Carote', 'Piselli', 'Riso basmati'],
        ingredientsEn: ['Horse meat 60%', 'Carrots', 'Peas', 'Basmati rice']
    },
    {
        id: 5,
        name: 'PappaFresh Maiale',
        nameEn: 'PappaFresh Pork',
        price: 6.66,
        image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400&h=300&fit=crop',
        description: 'Maiale biologico con mele e finocchi',
        descriptionEn: 'Organic pork with apples and fennel',
        category: 'adult',
        weight: '400g',
        caloriesPer100g: 150,
        ingredients: ['Maiale biologico 60%', 'Mele', 'Finocchi', 'Farro'],
        ingredientsEn: ['Organic pork 60%', 'Apples', 'Fennel', 'Spelt']
    }
];

// Dog breeds with metabolic factors
const dogBreeds = {
    'toy': {
        factor: 1.1,
        breeds: ['Chihuahua', 'Maltese', 'Barboncino Toy']
    },
    'small': {
        factor: 1.0,
        breeds: ['Shih Tzu', 'Bassotto', 'Carlino', 'Cavalier King Charles Spaniel']
    },
    'medium': {
        factor: 1.0,
        breeds: ['Bulldog Francese', 'Beagle', 'Cocker Spaniel', 'Border Collie']
    },
    'large': {
        factor: 0.9,
        breeds: ['Labrador Retriever', 'Golden Retriever', 'Pastore Tedesco', 'Rottweiler', 'Dobermann']
    },
    'giant': {
        factor: 0.8,
        breeds: ['Alano', 'San Bernardo', 'Terranova']
    },
    'mixed': {
        factor: 1.0,
        breeds: ['Meticcio / Sconosciuto']
    }
};

// Daily grams reference table (2kg to 50kg)
const dailyGramsTable = {
    2: 101, 3: 135, 4: 166, 5: 194, 6: 221, 7: 246, 8: 270, 9: 293, 10: 315,
    11: 336, 12: 357, 13: 377, 14: 396, 15: 415, 16: 433, 17: 451, 18: 469,
    19: 486, 20: 503, 21: 519, 22: 535, 23: 551, 24: 567, 25: 582, 26: 597,
    27: 612, 28: 627, 29: 641, 30: 655, 31: 669, 32: 683, 33: 696, 34: 710,
    35: 723, 36: 736, 37: 749, 38: 762, 39: 774, 40: 787, 41: 799, 42: 811,
    43: 823, 44: 835, 45: 847, 46: 858, 47: 870, 48: 881, 49: 893, 50: 1123
};

// Static recommendations based on Excel data
const staticRecommendations = {
    // Age-based recommendations
    'puppy': {
        primary: [2], // Chicken - easier to digest for puppies
        secondary: [3] // Turkey - lean protein
    },
    'young': {
        primary: [1, 2], // Beef, Chicken - high energy needs
        secondary: [5] // Pork - variety
    },
    'adult': {
        primary: [1, 2, 3], // Beef, Chicken, Turkey - balanced nutrition
        secondary: [5] // Pork - variety
    },
    'senior': {
        primary: [2, 3], // Chicken, Turkey - easier digestion
        secondary: [4] // Horse - hypoallergenic option
    },
    
    // Activity level recommendations
    'high_activity': {
        primary: [1, 5], // Beef, Pork - higher calorie density
        secondary: [2] // Chicken
    },
    'moderate_activity': {
        primary: [1, 2, 3], // Beef, Chicken, Turkey
        secondary: [5] // Pork
    },
    'low_activity': {
        primary: [2, 3], // Chicken, Turkey - lower calories
        secondary: [4] // Horse
    },
    
    // Breed size recommendations
    'toy': {
        primary: [2, 3], // Chicken, Turkey - smaller kibble, easier digestion
        secondary: [1] // Beef
    },
    'small': {
        primary: [2, 3], // Chicken, Turkey
        secondary: [1, 5] // Beef, Pork
    },
    'medium': {
        primary: [1, 2, 3], // Beef, Chicken, Turkey
        secondary: [5] // Pork
    },
    'large': {
        primary: [1, 2], // Beef, Chicken - higher protein needs
        secondary: [3, 5] // Turkey, Pork
    },
    'giant': {
        primary: [1, 2], // Beef, Chicken - high protein for large breeds
        secondary: [3] // Turkey
    },
    
    // Special conditions
    'overweight': {
        primary: [2, 3], // Chicken, Turkey - lower calorie
        secondary: [4] // Horse
    },
    'underweight': {
        primary: [1, 5], // Beef, Pork - higher calorie
        secondary: [2] // Chicken
    },
    'allergies': {
        primary: [4], // Horse - hypoallergenic
        secondary: [3] // Turkey
    }
};

// Translations
const translations = {
    it: {
        'nav.products': 'Prodotti',
        'nav.trial': 'Box Prova',
        'nav.faq': 'FAQ',
        'nav.chat': 'Assistenza',
        'nav.contact': 'Contatti',
        'nav.blog': 'Blog',
        'footer.about.text': 'Pappa Fresh è il primo servizio italiano di cibo fresco per cani, preparato con ingredienti di qualità umana e consegnato a domicilio.',
        'footer.links': 'Link Utili',
        'footer.newsletter': 'Newsletter',
        'footer.newsletter.text': 'Iscriviti per ricevere consigli e offerte esclusive',
        'footer.newsletter.placeholder': 'La tua email',
        'footer.newsletter.button': 'Iscriviti',
        'footer.rights': 'Tutti i diritti riservati'
    },
    en: {
        'nav.products': 'Products',
        'nav.trial': 'Trial Box',
        'nav.faq': 'FAQ',
        'nav.chat': 'Support',
        'nav.contact': 'Contact',
        'nav.blog': 'Blog',
        'footer.about.text': 'Pappa Fresh is the first Italian fresh dog food service, prepared with human-grade ingredients and delivered to your door.',
        'footer.links': 'Useful Links',
        'footer.newsletter': 'Newsletter',
        'footer.newsletter.text': 'Subscribe to receive tips and exclusive offers',
        'footer.newsletter.placeholder': 'Your email',
        'footer.newsletter.button': 'Subscribe',
        'footer.rights': 'All rights reserved'
    }
};

// Utility functions
function interpolateDailyGrams(weight) {
    const weights = Object.keys(dailyGramsTable).map(Number).sort((a, b) => a - b);
    
    if (weight <= weights[0]) return dailyGramsTable[weights[0]];
    if (weight >= weights[weights.length - 1]) return dailyGramsTable[weights[weights.length - 1]];
    
    // Find the two closest weights for interpolation
    let lowerWeight = weights[0];
    let upperWeight = weights[weights.length - 1];
    
    for (let i = 0; i < weights.length - 1; i++) {
        if (weight >= weights[i] && weight <= weights[i + 1]) {
            lowerWeight = weights[i];
            upperWeight = weights[i + 1];
            break;
        }
    }
    
    // Linear interpolation
    const lowerGrams = dailyGramsTable[lowerWeight];
    const upperGrams = dailyGramsTable[upperWeight];
    const ratio = (weight - lowerWeight) / (upperWeight - lowerWeight);
    
    return Math.round(lowerGrams + (upperGrams - lowerGrams) * ratio);
}

function calculateCalories(weight, age, activity, neutered, breedCategory, recipeId) {
    // Get daily grams from reference table
    const dailyGrams = interpolateDailyGrams(weight);
    
    // Get recipe calorie density
    const recipe = products.find(p => p.id === recipeId);
    const caloriesPer100g = recipe ? recipe.caloriesPer100g : 130; // Default to beef
    
    // Calculate base calories
    const baseCalories = (dailyGrams * caloriesPer100g) / 100;
    
    // Apply activity multiplier
    let activityMultiplier = 1.0;
    switch (activity) {
        case 'high': activityMultiplier = 1.2; break;
        case 'low': activityMultiplier = 0.8; break;
        default: activityMultiplier = 1.0; break;
    }
    
    // Apply neutering adjustment
    const neuteringFactor = neutered === 'yes' ? 0.9 : 1.0;
    
    // Apply breed factor
    const breedFactor = getBreedFactor(breedCategory);
    
    // Calculate final calories
    const finalCalories = Math.round(baseCalories * breedFactor * activityMultiplier * neuteringFactor);
    
    return {
        dailyGrams,
        baseCalories: Math.round(baseCalories),
        finalCalories,
        portions: Math.ceil(finalCalories / (caloriesPer100g * 4)), // 400g portions
        monthlyPortions: Math.ceil((finalCalories / (caloriesPer100g * 4)) * 30)
    };
}

function getBreedFactor(breedName) {
    for (const [category, data] of Object.entries(dogBreeds)) {
        if (data.breeds.includes(breedName)) {
            return data.factor;
        }
    }
    return 1.0; // Default factor
}

function getBreedCategory(breedName) {
    for (const [category, data] of Object.entries(dogBreeds)) {
        if (data.breeds.includes(breedName)) {
            return category;
        }
    }
    return 'mixed';
}

function getRecommendedProducts(age, activity, breedCategory, condition) {
    let recommendedIds = new Set();
    
    // Age-based recommendations
    if (staticRecommendations[age]) {
        staticRecommendations[age].primary.forEach(id => recommendedIds.add(id));
        staticRecommendations[age].secondary.forEach(id => recommendedIds.add(id));
    }
    
    // Activity-based recommendations
    const activityKey = activity + '_activity';
    if (staticRecommendations[activityKey]) {
        staticRecommendations[activityKey].primary.forEach(id => recommendedIds.add(id));
    }
    
    // Breed size recommendations
    if (staticRecommendations[breedCategory]) {
        staticRecommendations[breedCategory].primary.forEach(id => recommendedIds.add(id));
    }
    
    // Condition-based recommendations
    if (staticRecommendations[condition]) {
        staticRecommendations[condition].primary.forEach(id => recommendedIds.add(id));
        staticRecommendations[condition].secondary.forEach(id => recommendedIds.add(id));
    }
    
    return Array.from(recommendedIds);
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    updateCartBadge();
    initializeLanguageSwitcher();
    
    // Page-specific initializations
    const currentPage = document.body.getAttribute('data-page');
    
    switch(currentPage) {
        case 'home':
            // Home page specific code
            break;
        case 'products':
            initializeProductsPage();
            break;
        case 'trial':
            initializeTrialPage();
            break;
        case 'cart':
            initializeCartPage();
            break;
        case 'checkout':
            initializeCheckoutPage();
            break;
        case 'chat':
            initializeChatPage();
            break;
        case 'contact':
            initializeContactPage();
            break;
        case 'blog':
            initializeBlogPage();
            break;
    }
    
    // Initialize newsletter forms
    initializeNewsletterForms();
}

// Products page initialization
function initializeProductsPage() {
    loadProducts();
    initializeProductFilters();
    
    // Check if coming from calculator with recommendations
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('from') === 'calculator') {
        showNutritionPlan();
    }
}

function loadProducts(filter = 'all', recommendedIds = []) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    let filteredProducts = products;
    if (filter !== 'all') {
        filteredProducts = products.filter(product => product.category === filter);
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const isRecommended = recommendedIds.includes(product.id);
        const productName = currentLanguage === 'en' ? product.nameEn : product.name;
        const productDescription = currentLanguage === 'en' ? product.descriptionEn : product.description;
        
        return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card product-card h-100" onclick="addToCart(${product.id})">
                    ${isRecommended ? '<div class="product-badge">Raccomandato</div>' : ''}
                    <img src="${product.image}" class="card-img-top" alt="${productName}">
                    <div class="card-body">
                        <h5 class="card-title">${productName}</h5>
                        <p class="card-text">${productDescription}</p>
                        <p class="text-muted small">
                            <strong>Ingredienti:</strong> ${(currentLanguage === 'en' ? product.ingredientsEn : product.ingredients).join(', ')}
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="price-tag">€${product.price.toFixed(2)}</div>
                            <small class="text-muted">${product.weight}</small>
                        </div>
                        <button class="btn btn-primary w-100 mt-2" onclick="event.stopPropagation(); addToCart(${product.id})">
                            <i class="bi bi-cart-plus me-2"></i>Aggiungi al Carrello
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function initializeProductFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            const filter = this.getAttribute('data-filter');
            loadProducts(filter);
        });
    });
}

// Trial page initialization
function initializeTrialPage() {
    populateBreedDropdown();
    initializeCalculatorSteps();
}

function populateBreedDropdown() {
    const breedSelect = document.getElementById('dog-breed');
    if (!breedSelect) return;
    
    // Clear existing options except the first one
    breedSelect.innerHTML = '<option value="">Seleziona la razza...</option>';
    
    // Add breed options grouped by size
    Object.entries(dogBreeds).forEach(([category, data]) => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = getCategoryLabel(category);
        
        data.breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed;
            optgroup.appendChild(option);
        });
        
        breedSelect.appendChild(optgroup);
    });
}

function getCategoryLabel(category) {
    const labels = {
        'toy': 'Razze Toy',
        'small': 'Razze Piccole',
        'medium': 'Razze Medie',
        'large': 'Razze Grandi',
        'giant': 'Razze Giganti',
        'mixed': 'Meticcio/Sconosciuto'
    };
    return labels[category] || category;
}

function initializeCalculatorSteps() {
    // Step 1 to 2
    const nextStep1 = document.getElementById('next-step-1');
    if (nextStep1) {
        nextStep1.addEventListener('click', function() {
            if (validateStep1()) {
                saveStep1Data();
                showStep(2);
            }
        });
    }
    
    // Step 2 navigation
    const nextStep2 = document.getElementById('next-step-2');
    const backStep2 = document.getElementById('back-step-2');
    
    if (nextStep2) {
        nextStep2.addEventListener('click', function() {
            if (validateStep2()) {
                saveStep2Data();
                calculateAndShowResults();
                showStep(3);
            }
        });
    }
    
    if (backStep2) {
        backStep2.addEventListener('click', () => showStep(1));
    }
    
    // Step 3 navigation
    const backStep3 = document.getElementById('back-step-3');
    if (backStep3) {
        backStep3.addEventListener('click', () => showStep(2));
    }
}

function validateStep1() {
    const name = document.getElementById('dog-name').value.trim();
    const breed = document.getElementById('dog-breed').value;
    const weight = document.getElementById('dog-weight').value;
    const age = document.getElementById('dog-age').value;
    
    if (!name || !breed || !weight || !age) {
        alert('Per favore compila tutti i campi obbligatori');
        return false;
    }
    
    if (weight < 1 || weight > 100) {
        alert('Il peso deve essere compreso tra 1 e 100 kg');
        return false;
    }
    
    return true;
}

function validateStep2() {
    const activity = document.getElementById('dog-activity').value;
    const neutered = document.querySelector('input[name="dog-neutered"]:checked');
    const condition = document.getElementById('dog-condition').value;
    
    if (!activity || !neutered || !condition) {
        alert('Per favore compila tutti i campi obbligatori');
        return false;
    }
    
    return true;
}

function saveStep1Data() {
    calculatorData.name = document.getElementById('dog-name').value.trim();
    calculatorData.breed = document.getElementById('dog-breed').value;
    calculatorData.weight = parseFloat(document.getElementById('dog-weight').value);
    calculatorData.age = document.getElementById('dog-age').value;
}

function saveStep2Data() {
    calculatorData.activity = document.getElementById('dog-activity').value;
    calculatorData.neutered = document.querySelector('input[name="dog-neutered"]:checked').value;
    calculatorData.condition = document.getElementById('dog-condition').value;
}

function calculateAndShowResults() {
    const breedCategory = getBreedCategory(calculatorData.breed);
    
    // Calculate for default recipe (Chicken - most common)
    const defaultRecipeId = 2; // Chicken
    const results = calculateCalories(
        calculatorData.weight,
        calculatorData.age,
        calculatorData.activity,
        calculatorData.neutered,
        breedCategory,
        defaultRecipeId
    );
    
    // Update results display
    document.getElementById('result-dog-name').textContent = calculatorData.name;
    document.getElementById('result-calories').textContent = results.finalCalories;
    document.getElementById('result-portions').textContent = results.portions;
    document.getElementById('result-monthly').textContent = results.monthlyPortions;
    document.getElementById('result-cost').textContent = (results.monthlyPortions * 6.66).toFixed(2);
    
    // Store results for product recommendations
    calculatorData.results = results;
    calculatorData.breedCategory = breedCategory;
    
    // Show recommended products
    showRecommendedProducts();
}

function showRecommendedProducts() {
    const recommendedIds = getRecommendedProducts(
        calculatorData.age,
        calculatorData.activity,
        calculatorData.breedCategory,
        calculatorData.condition
    );
    
    const container = document.getElementById('recommended-product-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">
                    <i class="bi bi-star-fill text-warning me-2"></i>
                    Prodotti Raccomandati per ${calculatorData.name}
                </h4>
                <div class="row" id="recommended-products">
                    ${products.filter(p => recommendedIds.includes(p.id)).map(product => `
                        <div class="col-md-6 col-lg-4 mb-3">
                            <div class="card h-100">
                                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                                <div class="card-body">
                                    <div class="product-badge">Raccomandato</div>
                                    <h6 class="card-title">${product.name}</h6>
                                    <p class="card-text small">${product.description}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="price-tag">€${product.price.toFixed(2)}</span>
                                        <small class="text-muted">${product.weight}</small>
                                    </div>
                                    <button class="btn btn-primary btn-sm w-100 mt-2" onclick="addToCart(${product.id})">
                                        <i class="bi bi-cart-plus me-1"></i>Aggiungi
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="text-center mt-4">
                    <a href="products.html?recommended=${recommendedIds.join(',')}" class="btn btn-outline-primary">
                        <i class="bi bi-eye me-2"></i>Vedi Tutti i Prodotti
                    </a>
                </div>
            </div>
        </div>
    `;
}

function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.calculator-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    document.getElementById(`step-${stepNumber}`).classList.add('active');
    
    // Update step indicator
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 === stepNumber) {
            step.classList.add('active');
        } else if (index + 1 < stepNumber) {
            step.classList.add('completed');
        }
    });
    
    currentStep = stepNumber;
}

// Cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            weight: product.weight,
            quantity: 1
        });
    }
    
    localStorage.setItem('pappa-cart', JSON.stringify(cart));
    updateCartBadge();
    
    // Show success message
    showNotification(`${product.name} aggiunto al carrello!`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('pappa-cart', JSON.stringify(cart));
    updateCartBadge();
    
    if (document.body.getAttribute('data-page') === 'cart') {
        loadCartItems();
    }
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('pappa-cart', JSON.stringify(cart));
        updateCartBadge();
        
        if (document.body.getAttribute('data-page') === 'cart') {
            loadCartItems();
        }
    }
}

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

// Cart page initialization
function initializeCartPage() {
    loadCartItems();
}

function loadCartItems() {
    const cartItemsBody = document.getElementById('cart-items-body');
    const emptyCart = document.getElementById('empty-cart');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    const orderSummaryCard = document.getElementById('order-summary-card');
    
    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartItemsContainer) cartItemsContainer.style.display = 'none';
        if (continueShoppingBtn) continueShoppingBtn.style.display = 'none';
        if (orderSummaryCard) orderSummaryCard.style.display = 'none';
        return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartItemsContainer) cartItemsContainer.style.display = 'block';
    if (continueShoppingBtn) continueShoppingBtn.style.display = 'block';
    if (orderSummaryCard) orderSummaryCard.style.display = 'block';
    
    if (cartItemsBody) {
        cartItemsBody.innerHTML = cart.map(item => `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
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
                <td>€${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    updateOrderSummary();
}

function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 39 ? 0 : 4.90;
    const total = subtotal + shipping;
    
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping-cost');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) subtotalElement.textContent = `€${subtotal.toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = shipping === 0 ? 'Gratuita' : `€${shipping.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `€${total.toFixed(2)}`;
}

// Checkout page initialization
function initializeCheckoutPage() {
    loadCheckoutData();
}

function loadCheckoutData() {
    const urlParams = new URLSearchParams(window.location.search);
    const purchaseType = urlParams.get('type') || 'single';
    
    // Update purchase type display
    const purchaseTypeText = document.getElementById('purchase-type-text');
    const purchaseTypeAlert = document.getElementById('purchase-type-alert');
    
    if (purchaseType === 'subscription') {
        if (purchaseTypeText) purchaseTypeText.textContent = 'Abbonamento - Risparmia 10%';
        if (purchaseTypeAlert) purchaseTypeAlert.className = 'alert alert-success mb-4';
    }
    
    // Load cart items in checkout
    loadCheckoutItems(purchaseType);
}

function loadCheckoutItems(purchaseType = 'single') {
    const container = document.getElementById('checkout-items');
    if (!container) return;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = purchaseType === 'subscription' ? subtotal * 0.1 : 0;
    const shipping = 0; // Free shipping for checkout
    const total = subtotal - discount + shipping;
    
    container.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.name}" width="40" height="40" class="rounded me-2">
                <div>
                    <small class="fw-bold">${item.name}</small>
                    <br><small class="text-muted">Qty: ${item.quantity}</small>
                </div>
            </div>
            <small>€${(item.price * item.quantity).toFixed(2)}</small>
        </div>
    `).join('');
    
    // Update totals
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutDiscount = document.getElementById('checkout-discount');
    const checkoutShipping = document.getElementById('checkout-shipping');
    const checkoutTotal = document.getElementById('checkout-total');
    const discountRow = document.getElementById('discount-row');
    
    if (checkoutSubtotal) checkoutSubtotal.textContent = `€${subtotal.toFixed(2)}`;
    if (checkoutShipping) checkoutShipping.textContent = 'Gratuita';
    if (checkoutTotal) checkoutTotal.textContent = `€${total.toFixed(2)}`;
    
    if (discount > 0) {
        if (checkoutDiscount) checkoutDiscount.textContent = `-€${discount.toFixed(2)}`;
        if (discountRow) discountRow.style.display = 'flex';
    }
}

// Process payment (mock function)
function processPayment() {
    const button = document.getElementById('complete-order');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');
    
    // Validate form
    const form = document.getElementById('shipping-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Check terms acceptance
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        alert('Devi accettare i termini e condizioni per procedere');
        return;
    }
    
    // Show loading state
    if (button) button.disabled = true;
    if (buttonText) buttonText.textContent = 'Elaborazione...';
    if (spinner) spinner.classList.remove('d-none');
    
    // Simulate payment processing
    setTimeout(() => {
        // Clear cart
        localStorage.removeItem('pappa-cart');
        
        // Redirect to success page
        window.location.href = 'order-success.html';
    }, 2000);
}

// Chat functionality
function initializeChatPage() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message) {
                addChatMessage(message, 'user');
                chatInput.value = '';
                
                // Simulate bot response
                setTimeout(() => {
                    addChatMessage(getBotResponse(message), 'bot');
                }, 1000);
            }
        });
    }
}

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    const responses = {
        'conservo': 'Pappa Fresh va conservata in frigorifero e consumata entro 3-4 giorni dall\'apertura. Può essere congelata fino a 3 mesi.',
        'consegna': 'Consegniamo in 24-48 ore in tutta Italia con corriere refrigerato. Spedizione gratuita sopra i 39€.',
        'abbonamento': 'L\'abbonamento è flessibile e senza vincoli. Ricevi la pappa ogni 2 o 4 settimane con il 10% di sconto.',
        'porzioni': 'Usa il nostro calcolatore nella sezione "Box Prova" per calcolare le porzioni esatte per il tuo cane.',
        'ricetta': 'Puoi alternare le ricette ad ogni consegna per offrire varietà al tuo cane.'
    };
    
    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return 'Grazie per la tua domanda! Un nostro operatore ti risponderà al più presto. Per assistenza immediata puoi chiamare il +39 02 1234567.';
}

// Contact form
function initializeContactPage() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            showNotification('Messaggio inviato con successo! Ti risponderemo entro 24 ore.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Blog page
function initializeBlogPage() {
    // Blog functionality can be added here
    console.log('Blog page initialized');
}

// Language switcher
function initializeLanguageSwitcher() {
    const langSwitches = document.querySelectorAll('.lang-switch');
    langSwitches.forEach(switcher => {
        switcher.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active language indicator
    document.querySelectorAll('.lang-switch').forEach(switcher => {
        switcher.classList.remove('active');
        if (switcher.getAttribute('data-lang') === lang) {
            switcher.classList.add('active');
        }
    });
    
    // Update translations
    updateTranslations();
    
    // Reload products if on products page
    if (document.body.getAttribute('data-page') === 'products') {
        loadProducts();
    }
}

function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
}

// Newsletter forms
function initializeNewsletterForms() {
    const newsletterForms = document.querySelectorAll('#newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('Iscrizione completata! Grazie per esserti iscritto alla nostra newsletter.', 'success');
                this.reset();
            }
        });
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.processPayment = processPayment;
window.askQuestion = function(question) {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.value = question;
        document.getElementById('chat-form').dispatchEvent(new Event('submit'));
    }
};