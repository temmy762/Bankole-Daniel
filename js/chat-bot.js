/**
 * Simple Chat Bot
 * A lightweight chat bot implementation for the portfolio website
 */
class ChatBot {
    constructor(options = {}) {
        this.options = {
            containerId: 'chatContainer',
            toggleId: 'chatToggle',
            userName: 'You',
            botName: 'SolvaBot',
            initialMessage: 'Hi there! I\'m SolvaBot, Daniel\'s assistant. How can I help you today?',
            placeholder: 'Type your message...',
            ...options
        };
        
        this.isOpen = false;
        this.isInitialized = false;
        this.container = null;
        this.toggleButton = null;
        this.messagesContainer = null;
        this.inputField = null;
        this.knowledge = {
            services: [
                'WordPress Development', 
                'Full Stack Development', 
                'Web Design',
                'E-commerce Solutions',
                'AI Integration',
                'SEO Services'
            ],
            common: {
                'greeting': ['Hello!', 'Hi there!', 'Greetings!', 'Hey!', 'Welcome!'],
                'goodbye': ['Goodbye!', 'See you soon!', 'Have a great day!', 'Bye!', 'Take care!'],
                'thanks': ['You\'re welcome!', 'Happy to help!', 'Anytime!', 'My pleasure!', 'No problem!'],
                'default': [
                    'I\'m not sure I understand. Can you rephrase that?',
                    'Could you be more specific?',
                    'I don\'t have information about that yet.',
                    'Would you like to know about Daniel\'s services instead?'
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        // Create chat container if it doesn't exist
        this.createChatInterface();
        
        // Create chat toggle button if it doesn't exist
        this.createToggleButton();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Add initial message
        setTimeout(() => {
            this.addBotMessage(this.options.initialMessage);
        }, 500);
        
        this.isInitialized = true;
        console.log('✅ Chat Bot: Initialized successfully');
    }
    
    createChatInterface() {
        // Check if container already exists
        let existingContainer = document.getElementById(this.options.containerId);
        
        if (!existingContainer) {
            // Create chat container
            this.container = document.createElement('div');
            this.container.id = this.options.containerId;
            this.container.className = 'fixed bottom-20 right-6 w-80 md:w-96 h-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col overflow-hidden z-40 border border-gray-200 dark:border-gray-700 transition-all duration-300 opacity-0 invisible scale-95';
            
            // Create chat header
            const header = document.createElement('div');
            header.className = 'bg-primary text-white px-4 py-3 flex justify-between items-center';
            header.innerHTML = `
                <div class="flex items-center">
                    <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
                        <i class="ri-customer-service-2-line"></i>
                    </div>
                    <h3 class="font-medium">${this.options.botName}</h3>
                </div>
                <button id="closeChatBtn" class="text-white hover:text-gray-200 focus:outline-none">
                    <i class="ri-close-line ri-lg"></i>
                </button>
            `;
            
            // Create messages container
            this.messagesContainer = document.createElement('div');
            this.messagesContainer.className = 'flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900';
            
            // Create input area
            const inputArea = document.createElement('div');
            inputArea.className = 'p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center';
            
            this.inputField = document.createElement('input');
            this.inputField.type = 'text';
            this.inputField.placeholder = this.options.placeholder;
            this.inputField.className = 'flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-l-full focus:outline-none focus:ring-2 focus:ring-primary text-gray-700 dark:text-white';
            
            const sendButton = document.createElement('button');
            sendButton.className = 'bg-primary text-white rounded-r-full px-4 py-2 hover:bg-opacity-90 transition-colors';
            sendButton.innerHTML = '<i class="ri-send-plane-fill"></i>';
            
            inputArea.appendChild(this.inputField);
            inputArea.appendChild(sendButton);
            
            // Assemble the chat interface
            this.container.appendChild(header);
            this.container.appendChild(this.messagesContainer);
            this.container.appendChild(inputArea);
            
            // Add to DOM
            document.body.appendChild(this.container);
            
            // Set up close button
            document.getElementById('closeChatBtn').addEventListener('click', () => this.toggleChat());
            
            // Set up send button
            sendButton.addEventListener('click', () => this.sendMessage());
        } else {
            this.container = existingContainer;
            this.messagesContainer = this.container.querySelector('div:nth-child(2)');
            this.inputField = this.container.querySelector('input');
        }
    }
    
    createToggleButton() {
        // Check if toggle button already exists
        let existingButton = document.getElementById(this.options.toggleId);
        
        if (!existingButton) {
            this.toggleButton = document.createElement('button');
            this.toggleButton.id = this.options.toggleId;
            this.toggleButton.className = 'fixed bottom-6 right-6 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-opacity-90 transition-colors';
            this.toggleButton.innerHTML = '<i class="ri-message-3-line ri-lg"></i>';
            this.toggleButton.setAttribute('aria-label', 'Open Chat');
            
            document.body.appendChild(this.toggleButton);
        } else {
            this.toggleButton = existingButton;
        }
    }
    
    setupEventListeners() {
        // Toggle chat on button click
        this.toggleButton.addEventListener('click', () => this.toggleChat());
        
        // Send message on enter key
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
    
    toggleChat() {
        if (this.isOpen) {
            // Close chat
            this.container.classList.remove('opacity-100', 'visible', 'scale-100');
            this.container.classList.add('opacity-0', 'invisible', 'scale-95');
            this.toggleButton.innerHTML = '<i class="ri-message-3-line ri-lg"></i>';
        } else {
            // Open chat
            this.container.classList.remove('opacity-0', 'invisible', 'scale-95');
            this.container.classList.add('opacity-100', 'visible', 'scale-100');
            this.toggleButton.innerHTML = '<i class="ri-close-line ri-lg"></i>';
            this.inputField.focus();
        }
        
        this.isOpen = !this.isOpen;
    }
    
    sendMessage() {
        const message = this.inputField.value.trim();
        
        if (message) {
            // Add user message
            this.addUserMessage(message);
            
            // Clear input field
            this.inputField.value = '';
            
            // Process the message and generate a response
            setTimeout(() => {
                const response = this.generateResponse(message);
                this.addBotMessage(response);
            }, 500 + Math.random() * 1000); // Random delay for more natural feel
        }
    }
    
    addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message chat-message-user flex justify-end mb-3';
        messageElement.innerHTML = `
            <div class="max-w-3/4 bg-primary text-white py-2 px-4 rounded-lg rounded-tr-none">
                <p>${this.escapeHTML(message)}</p>
                <span class="text-xs opacity-75 block text-right mt-1">${this.getCurrentTime()}</span>
            </div>
        `;
        
        this.messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }
    
    addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message chat-message-bot flex mb-3';
        messageElement.innerHTML = `
            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                <i class="ri-customer-service-2-line text-white text-sm"></i>
            </div>
            <div class="max-w-3/4 bg-gray-200 dark:bg-gray-700 py-2 px-4 rounded-lg rounded-tl-none">
                <p class="text-gray-800 dark:text-white">${this.escapeHTML(message)}</p>
                <span class="text-xs text-gray-500 dark:text-gray-400 block mt-1">${this.getCurrentTime()}</span>
            </div>
        `;
        
        this.messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }
    
    generateResponse(message) {
        message = message.toLowerCase();
        
        // Check for greetings
        if (this.containsAny(message, ['hello', 'hi', 'hey', 'greetings', 'howdy'])) {
            return this.getRandomResponse('greeting') + ' How can I help you today?';
        }
        
        // Check for goodbyes
        if (this.containsAny(message, ['bye', 'goodbye', 'see you', 'later', 'take care'])) {
            return this.getRandomResponse('goodbye');
        }
        
        // Check for thanks
        if (this.containsAny(message, ['thanks', 'thank you', 'appreciate', 'helpful'])) {
            return this.getRandomResponse('thanks');
        }
        
        // Check for services
        if (this.containsAny(message, ['service', 'offer', 'provide', 'do you', 'what can', 'help with'])) {
            return `Daniel offers various services including: ${this.knowledge.services.join(', ')}. What specific service are you interested in?`;
        }
        
        // Check for contact
        if (this.containsAny(message, ['contact', 'email', 'call', 'phone', 'reach', 'talk to'])) {
            return 'You can contact Daniel through the contact form on the website, or directly at info@solvatree.com. Would you like me to help you with anything else?';
        }
        
        // Check for pricing
        if (this.containsAny(message, ['price', 'cost', 'how much', 'fee', 'rate', 'quote'])) {
            return 'Pricing varies based on project requirements and scope. For a custom quote, please use the contact form or send details to info@solvatree.com. Would you like to know more about any specific service?';
        }
        
        // Check for specific services
        if (message.includes('wordpress')) {
            return 'Daniel specializes in custom WordPress development, including themes, plugins, and complete websites. He can help with performance optimization, security, and maintenance as well. Would you like more details?';
        }
        
        if (this.containsAny(message, ['full stack', 'fullstack', 'web app', 'application'])) {
            return 'Daniel builds full stack web applications using modern technologies like React, Node.js, Next.js, and more. He can create custom solutions tailored to your specific needs. What kind of application are you interested in?';
        }
        
        if (this.containsAny(message, ['ai', 'machine learning', 'chatbot', 'artificial intelligence'])) {
            return 'Daniel offers AI integration services, including custom chatbots, natural language processing, and machine learning solutions. These can automate customer support, enhance user experience, and provide valuable insights. Would you like to know more about AI services?';
        }
        
        // Default response
        return this.getRandomResponse('default');
    }
    
    containsAny(str, keywords) {
        return keywords.some(keyword => str.includes(keyword));
    }
    
    getRandomResponse(type) {
        const responses = this.knowledge.common[type] || this.knowledge.common.default;
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chat bot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.chatBot = new ChatBot();
});
