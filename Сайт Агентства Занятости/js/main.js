document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('mainNav');

  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('active');
      this.innerHTML = nav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });


    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });

 
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        nav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  }


  const tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
      
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        
   
        this.classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');
      });
    });
  }


  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      let isValid = true;
      const requiredInputs = this.querySelectorAll('[required]');
      
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'red';
        } else {
          input.style.borderColor = '#ddd';
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        alert('Пожалуйста, заполните все обязательные поля');
      }
    });
  });
});