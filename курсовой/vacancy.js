document.addEventListener('DOMContentLoaded', function() {
    
    const vacancyForm = document.getElementById('vacancy-form');
    if (vacancyForm) {
        vacancyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const vacancyData = collectVacancyData();
            saveVacancyData(vacancyData);
            const xmlString = convertVacancyToXML(vacancyData);
            downloadXML(xmlString, 'vacancy.xml');
            window.location.href = 'jobs.html';
        });
    }
    
  
    function collectVacancyData() {
        const formData = new FormData(vacancyForm);
        const vacancyData = {};
        
        for (let [key, value] of formData.entries()) {
            vacancyData[key] = value;
        }
        
        
        vacancyData.createdAt = new Date().toISOString();
        
        return vacancyData;
    }
    
    function saveVacancyData(data) {
        
        let vacancies = JSON.parse(localStorage.getItem('vacancies')) || [];
        vacancies.push(data);
        localStorage.setItem('vacancies', JSON.stringify(vacancies));
    }
    
    function convertVacancyToXML(data) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<?xml-stylesheet type="text/xsl" href="vacancy.xsl"?>\n';
        xml += '<vacancy>\n';
        
        
        xml += `  <company>\n`;
        xml += `    <name>${escapeXML(data['company-name'] || '')}</name>\n`;
        xml += `    <description>${escapeXML(data['company-description'] || '')}</description>\n`;
        xml += `    <website>${escapeXML(data['company-website'] || '')}</website>\n`;
        xml += `    <email>${escapeXML(data['company-email'] || '')}</email>\n`;
        xml += `    <phone>${escapeXML(data['company-phone'] || '')}</phone>\n`;
        xml += `  </company>\n`;
        
        
        xml += `  <info>\n`;
        xml += `    <title>${escapeXML(data['vacancy-title'] || '')}</title>\n`;
        xml += `    <category>${escapeXML(data['vacancy-category'] || '')}</category>\n`;
        xml += `    <description>${escapeXML(data['vacancy-description'] || '')}</description>\n`;
        xml += `    <requirements>${escapeXML(data['vacancy-requirements'] || '')}</requirements>\n`;
        xml += `    <responsibilities>${escapeXML(data['vacancy-responsibilities'] || '')}</responsibilities>\n`;
        xml += `    <conditions>${escapeXML(data['vacancy-conditions'] || '')}</conditions>\n`;
        xml += `  </info>\n`;
        
       
        xml += `  <details>\n`;
        xml += `    <salary>${escapeXML(data['vacancy-salary'] || '')}</salary>\n`;
        xml += `    <employment>${escapeXML(data['vacancy-employment'] || '')}</employment>\n`;
        xml += `    <experience>${escapeXML(data['vacancy-experience'] || '')}</experience>\n`;
        xml += `    <education>${escapeXML(data['vacancy-education'] || '')}</education>\n`;
        xml += `    <location>\n`;
        xml += `      <city>${escapeXML(data['vacancy-city'] || '')}</city>\n`;
        xml += `      <address>${escapeXML(data['vacancy-address'] || '')}</address>\n`;
        xml += `    </location>\n`;
        xml += `    <created>${escapeXML(data.createdAt || '')}</created>\n`;
        xml += `  </details>\n`;
        
        xml += '</vacancy>';
        
        return xml;
    }
    
    function escapeXML(str) {
        return str ? str.toString().replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&apos;') : '';
    }
    
    function downloadXML(xmlString, filename) {
        const blob = new Blob([xmlString], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    
    if (window.location.pathname.includes('jobs.html')) {
        loadVacancies();
    }
    
    function loadVacancies() {
        const vacancies = JSON.parse(localStorage.getItem('vacancies')) || [];
        const jobsContainer = document.getElementById('jobs-container');
        const jobsCount = document.getElementById('jobs-count');
        
        jobsContainer.innerHTML = '';
        jobsCount.textContent = vacancies.length;
        
        if (vacancies.length === 0) {
            jobsContainer.innerHTML = `
                <div class="no-jobs">
                    <p>Пока нет доступных вакансий</p>
                    <a href="create-vacancy.html" class="btn btn-primary">Разместить вакансию</a>
                </div>
            `;
            return;
        }
        
        vacancies.forEach(vacancy => {
            const jobElement = document.createElement('div');
            jobElement.className = 'job-card';
            jobElement.innerHTML = `
                <div class="job-header">
                    <div>
                        <h3 class="job-title">${vacancy['vacancy-title'] || 'Название не указано'}</h3>
                        <p class="job-company">${vacancy['company-name'] || 'Компания не указана'}</p>
                    </div>
                    <div class="job-salary">${vacancy['vacancy-salary'] || 'Зарплата не указана'}</div>
                </div>
                <div class="job-info">
                    <div class="job-info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${vacancy['vacancy-city'] || 'Город не указан'}</span>
                    </div>
                    <div class="job-info-item">
                        <i class="fas fa-briefcase"></i>
                        <span>${getExperienceText(vacancy['vacancy-experience'])}</span>
                    </div>
                    <div class="job-info-item">
                        <i class="fas fa-clock"></i>
                        <span>${getEmploymentText(vacancy['vacancy-employment'])}</span>
                    </div>
                </div>
                <div class="job-description">${vacancy['vacancy-description'] || 'Описание отсутствует'}</div>
                <div class="job-actions">
                    <button class="btn btn-primary">Откликнуться</button>
                </div>
            `;
            
            jobsContainer.appendChild(jobElement);
        });
    }
    
    function getExperienceText(exp) {
        switch(exp) {
            case 'no': return 'Без опыта';
            case '1-3': return '1-3 года опыта';
            case '3-5': return '3-5 лет опыта';
            case '5+': return 'Более 5 лет опыта';
            default: return 'Опыт не указан';
        }
    }
    
    function getEmploymentText(emp) {
        switch(emp) {
            case 'full': return 'Полная занятость';
            case 'part': return 'Частичная занятость';
            case 'project': return 'Проектная работа';
            case 'internship': return 'Стажировка';
            case 'remote': return 'Удаленная работа';
            default: return 'Тип занятости не указан';
        }
    }
});