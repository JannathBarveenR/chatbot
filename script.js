document.addEventListener('DOMContentLoaded', () => {
    const chatDisplay = document.getElementById('chat-display');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Function to add a message to the chat display
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        // This allows rendering HTML content like image tags
        messageDiv.innerHTML = message;
        
        chatDisplay.appendChild(messageDiv);
        // Scroll to the latest message
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }

    // Simple rule-based bot responses
    function getBotResponse(userMessage) {
        const msg = userMessage.toLowerCase();

        if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
            return "Hello there! How can I assist you with college admissions today?";
        } else if (msg.includes('admission') || msg.includes('apply') || msg.includes('how to join')) {
            return "Our admission process is straightforward! You can find detailed steps and application forms on our official admissions page: [Your College Admissions Link Here]. Do you have any specific questions about eligibility or deadlines?";
        } else if (msg.includes('courses') || msg.includes('programs') || msg.includes('degrees')) {
            return "We offer a wide range of undergraduate and postgraduate programs like  1.Computer Science Engineering 2.Electronics and Communication Engineering 3.Electrical and Electronics Engineering 4.Mechotronics Engineering 5.Mechanical Engineering 6.Artificial Intelligence and DataScience 7.Information Technology. What field are you interested in?";
        
        }
         else if (msg.includes('itlab') || msg.includes('itlabphotos') ) {
            // Placeholder for college images - replace with actual image URLs
            return `
                   This is Our Department Lab
                    <img src="d:/collegechatbot/images/apple lab.jpg" alt="whole View">`;
         }
         else if (msg.includes('csedepatrtment') || msg.includes('  Cse department')) {
            return "Welcome to the Department of Computer Science and Engineering...!would you know about our lab please type cselab";    
        }
        else if (msg.includes('cselab') || msg.includes('Cse lab')) {
            return `<img src="d:/collegechatbot/images/cs lab.jpeg">`;    
        }

        else if (msg.includes('eeedepartment') || msg.includes('  EEE Department')) {
            return "Welcome to the Department of Electrical and Electronics Engineering...!would you know about EEE Block Buiding please type eeeblock";    
        }
        else if (msg.includes('eee block') || msg.includes('eeeblock')) {

            return `EEE Block<img src="d:/collegechatbot/images/eee block.jpeg">
            This is the Front view of Our department 
           <img src="d:/collegechatbot/images/eee block front view.jpeg">`;    
        }
        else if (msg.includes('girlshostel') || msg.includes('girls hostel')) {

            return `Girls Hostel <br><img src="d:/collegechatbot/images/girls hostel.jpg">
           `;    
        }


         else if (msg.includes('fees') || msg.includes('cost') || msg.includes('tuition')) {
            return "Information regarding tuition fees for various programs is available on our fees structure page: [Your College Fees Link Here]. Please note that fees may vary by course and year.";
        } else if (msg.includes('facilities') || msg.includes('campus') || msg.includes('hostel')) {
            return "Our campus boasts state-of-the-art facilities including modern libraries, well-equipped labs, sports complexes, comfortable hostels, and a vibrant student common area. What facility would you like to know more about?";
        } else if (msg.includes('college images') || msg.includes('college photos') || msg.includes('college pictures') || msg.includes('college look')) {
            // Placeholder for college images - replace with actual image URLs
            return `Here are some glimpses of our beautiful campus:
                   This is Our College Whole View 
                    <img src="d:/collegechatbot/images/whole view.jpg" alt="whole View">
                    This is Our College Logo 
                    <img src="d:/collegechatbot/images/logo.jpeg" alt="College Logo">
                    <br>You can find more photos on our official gallery: [Your College Gallery Link]`;
        } else if (msg.includes('contact') || msg.includes('reach us') || msg.includes('phone number')) {
            return "You can contact our admissions office at +91-XXXX-XXXXXX or email us at admissions@yourcollege.edu.in. Our office hours are Monday to Friday, 9 AM to 5 PM.";
        } else if (msg.includes('events') || msg.includes('open house')) {
            return "We regularly host admission workshops, open house events, and campus tours. Please check our 'Events' section on the website for upcoming schedules: [Your College Events Link]";
        } else if (msg.includes('documents') || msg.includes('required documents')) {
            return "Commonly required documents include mark sheets, transfer certificates, passport-size photos, and ID proof. A complete list will be provided with your application form or on our admissions portal.";
        } else if (msg.includes('thank you') || msg.includes('thanks')) {
            return "You're welcome! Is there anything else I can help you with?";    
        }
        else if (msg.includes('library') || msg.includes('libraryimage')) {
            return "We Have a Good facilities";    
        }
        else if (msg.includes('canteen') || msg.includes('Canteen') ) {
            return `
                   This is Our College Canteen
                    <img src="d:/collegechatbot/images/canteen.JPG" alt="whole View">`;
         }
        else if (msg.includes('yes') || msg.include('mm')){
            return "Yaaa...I am Welcome how  can i help with you ....?";
        }
        else if (msg.includes('bye') || msg.includes('goodbye')) {
            return "Goodbye! Feel free to reach out if you have more questions. All the best!";
        }
        else {
            return "I'm sorry, I don't quite understand that yet. Could you please rephrase your question or ask about admissions, courses, facilities, or contact info?";
        }
    }

    // Function to handle sending messages
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return; // Don't send empty messages

        addMessage(message, 'user');
        userInput.value = ''; // Clear input field

        // Simulate a typing delay for the bot
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 700); // 700ms delay
    }

    // Event listener for send button click
    sendButton.addEventListener('click', sendMessage);

    // Event listener for Enter key press in the input field
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});