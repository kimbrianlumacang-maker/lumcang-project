
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.toggle-password');
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function showMessage(type, text) {
    const messageContainer = document.getElementById('messageContainer');
    const message = document.getElementById(type + 'Message');
    const messageText = message.querySelector('span');
    
    messageText.textContent = text;
    message.classList.add('show');
    
    setTimeout(() => {
        message.classList.remove('show');
    }, 4000);
}


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = [];
    
  
    if (password.length >= 8) {
        strength += 1;
    } else {
        feedback.push('At least 8 characters');
    }
    
   
    if (/[A-Z]/.test(password)) {
        strength += 1;
    } else {
        feedback.push('One uppercase letter');
    }
    
   
    if (/[a-z]/.test(password)) {
        strength += 1;
    } else {
        feedback.push('One lowercase letter');
    }
    
    
    if (/\d/.test(password)) {
        strength += 1;
    } else {
        feedback.push('One number');
    }
    
    
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strength += 1;
    } else {
        feedback.push('One special character');
    }
    
    return { strength, feedback };
}


function updatePasswordStrength(password) {
    const strengthContainer = document.getElementById('passwordStrength');
    const strengthBar = strengthContainer.querySelector('.strength-fill');
    const strengthText = strengthContainer.querySelector('.strength-text');
    
    if (!password) {
        strengthContainer.className = 'password-strength';
        strengthText.textContent = 'Password strength';
        return;
    }
    
    const { strength, feedback } = checkPasswordStrength(password);
    
    
    strengthContainer.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
    
    if (strength <= 2) {
        strengthContainer.classList.add('strength-weak');
        strengthText.textContent = 'Weak password';
    } else if (strength <= 4) {
        strengthContainer.classList.add('strength-medium');
        strengthText.textContent = 'Medium password';
    } else {
        strengthContainer.classList.add('strength-strong');
        strengthText.textContent = 'Strong password';
    }
}


function setupRealTimeValidation() {
    
    const signupEmail = document.getElementById('signupEmail');
    if (signupEmail) {
        signupEmail.addEventListener('input', function() {
            const validation = document.getElementById('emailValidation');
            const email = this.value;
            
            if (email.length === 0) {
                validation.className = 'validation-message';
                validation.textContent = '';
                return;
            }
            
            if (validateEmail(email)) {
                validation.className = 'validation-message success show';
                validation.textContent = 'Valid email address';
            } else {
                validation.className = 'validation-message error show';
                validation.textContent = 'Please enter a valid email address';
            }
        });
    }
    
    
    const signupPassword = document.getElementById('signupPassword');
    if (signupPassword) {
        signupPassword.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }
    
    
    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword && signupPassword) {
        confirmPassword.addEventListener('input', function() {
            const validation = document.getElementById('confirmPasswordValidation');
            const password = signupPassword.value;
            const confirmPass = this.value;
            
            if (confirmPass.length === 0) {
                validation.className = 'validation-message';
                validation.textContent = '';
                return;
            }
            
            if (password === confirmPass) {
                validation.className = 'validation-message success show';
                validation.textContent = 'Passwords match';
            } else {
                validation.className = 'validation-message error show';
                validation.textContent = 'Passwords do not match';
            }
        });
    }
}


function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.auth-button');
    const email = form.email.value;
    const password = form.password.value;
    
    
    if (!email || !password) {
        showMessage('error', 'Please fill in all fields');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('error', 'Please enter a valid email address');
        return;
    }
    
  
    submitButton.classList.add('loading');
    
    
    setTimeout(() => {
        submitButton.classList.remove('loading');
        
        
        if (email === 'demo@example.com' && password === 'password123') {
            showMessage('success', 'Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showMessage('error', 'Invalid credentials. Try demo@example.com / password123');
        }
    }, 1500);
}


function handleSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.auth-button');
    const formData = new FormData(form);
    
    
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const terms = formData.get('terms');
    
    
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        showMessage('error', 'Please fill in all required fields');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('error', 'Please enter a valid email address');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('error', 'Passwords do not match');
        return;
    }
    
    const { strength } = checkPasswordStrength(password);
    if (strength < 3) {
        showMessage('error', 'Please choose a stronger password');
        return;
    }
    
    if (!terms) {
        showMessage('error', 'Please accept the terms of service');
        return;
    }
    
    
    submitButton.classList.add('loading');
    
    
    setTimeout(() => {
        submitButton.classList.remove('loading');
        showMessage('success', 'Account created successfully! Please check your email to verify.');
        
        
        setTimeout(() => {
            form.reset();
            
            const strengthContainer = document.getElementById('passwordStrength');
            if (strengthContainer) {
                strengthContainer.className = 'password-strength';
                strengthContainer.querySelector('.strength-text').textContent = 'Password strength';
            }
            
            
            const validationMessages = document.querySelectorAll('.validation-message');
            validationMessages.forEach(msg => {
                msg.className = 'validation-message';
                msg.textContent = '';
            });
        }, 3000);
    }, 2000);
}


function handleSocialLogin(provider) {
    showMessage('success', `Redirecting to ${provider} login...`);
    
    // In a real application, you would redirect to the OAuth provider
    setTimeout(() => {
        console.log(`Initiating ${provider} OAuth flow`);
        // window.location.href = `https://oauth.${provider}.com/authorize?...`;
    }, 1000);
}

// Phone number formatting
function formatPhoneNumber(input) {
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (value.length >= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length >= 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    
    input.value = value;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Setup real-time validation
    setupRealTimeValidation();
    
    // Handle form submissions
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Handle social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.classList.contains('google') ? 'Google' : 'GitHub';
            handleSocialLogin(provider);
        });
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
    
    // Add floating label effect
    const inputs = document.querySelectorAll('.input-container input');
    inputs.forEach(input => {
        // Check if input has value on page load
        if (input.value) {
            input.classList.add('has-value');
        }
        
        input.addEventListener('blur', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
    
    // Add smooth animations to form elements
    const formElements = document.querySelectorAll('.form-group');
    formElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('fade-in');
    });
});

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
