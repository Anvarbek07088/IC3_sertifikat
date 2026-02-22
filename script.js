// Login formini boshqarish
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // Demo login - istalgan login/parol bilan kirish mumkin
            if (username && password) {
                // Foydalanuvchi ma'lumotlarini saqlash
                localStorage.setItem('ic3_username', username);
                localStorage.setItem('ic3_logged_in', 'true');
                
                // Test sahifasiga o'tish
                window.location.href = 'test.html';
            } else {
                alert('Iltimos, login va parolni kiriting!');
            }
        });
    }
});

// Test sahifasidan chiqish
function logout() {
    if (confirm('Haqiqatan ham chiqmoqchimisiz?')) {
        localStorage.removeItem('ic3_username');
        localStorage.removeItem('ic3_logged_in');
        window.location.href = 'index.html';
    }
}

// Foydalanuvchi avtorizatsiyasini tekshirish
function checkAuth() {
    const isLoggedIn = localStorage.getItem('ic3_logged_in');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'test.html' && !isLoggedIn) {
        window.location.href = 'index.html';
    }
    
    if (currentPage === 'index.html' && isLoggedIn) {
        window.location.href = 'test.html';
    }
}

// Sahifa yuklanganda avtorizatsiyani tekshirish
checkAuth();