document.addEventListener('DOMContentLoaded', function() {
    const addExperienceBtn = document.getElementById('add-experience');
    const experienceContainer = document.getElementById('experience-container');
    
    if (addExperienceBtn && experienceContainer) {
        addExperienceBtn.addEventListener('click', function() {
            const experienceItem = document.createElement('div');
            experienceItem.className = 'experience-item';
            experienceItem.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label>Компания*</label>
                        <input type="text" name="company[]" class="experience-field" required>
                    </div>
                    <div class="form-group">
                        <label>Должность*</label>
                        <input type="text" name="job-title[]" class="experience-field" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Период работы (с)*</label>
                        <input type="date" name="start-date[]" class="experience-field" required>
                    </div>
                    <div class="form-group">
                        <label>Период работы (по)</label>
                        <input type="date" name="end-date[]">
                    </div>
                </div>
                <div class="form-group">
                    <label>Обязанности и достижения</label>
                    <textarea name="responsibilities[]" rows="3"></textarea>
                </div>
                <button type="button" class="btn btn-remove remove-experience">Удалить</button>
            `;
            
            experienceContainer.appendChild(experienceItem);
            
       
            const removeBtn = experienceItem.querySelector('.remove-experience');
            removeBtn.addEventListener('click', function() {
                experienceContainer.removeChild(experienceItem);
            });
        });
    }
 
    const addEducationBtn = document.getElementById('add-education');
    const educationContainer = document.getElementById('education-container');
    
    if (addEducationBtn && educationContainer) {
        addEducationBtn.addEventListener('click', function() {
            const educationItem = document.createElement('div');
            educationItem.className = 'education-item';
            educationItem.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label>Учебное заведение*</label>
                        <input type="text" name="institution[]" class="education-field" required>
                    </div>
                    <div class="form-group">
                        <label>Специальность*</label>
                        <input type="text" name="specialty[]" class="education-field" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Год окончания*</label>
                        <input type="number" name="graduation-year[]" class="education-field" required>
                    </div>
                    <div class="form-group">
                        <label>Степень</label>
                        <input type="text" name="degree[]">
                    </div>
                </div>
                <button type="button" class="btn btn-remove remove-education">Удалить</button>
            `;
            
            educationContainer.appendChild(educationItem);
      
            const removeBtn = educationItem.querySelector('.remove-education');
            removeBtn.addEventListener('click', function() {
                educationContainer.removeChild(educationItem);
            });
        });
    }
    
   
    const noExperienceCheckbox = document.getElementById('no-experience');
    if (noExperienceCheckbox) {
        noExperienceCheckbox.addEventListener('change', function() {
            const experienceFields = document.querySelectorAll('.experience-field');
            experienceFields.forEach(field => {
                field.required = !this.checked;
                field.disabled = this.checked;
            });
            
            if (this.checked) {
                document.querySelectorAll('.experience-field').forEach(f => f.value = '');
            }
        });
    }
    
   
    const noEducationCheckbox = document.getElementById('no-education');
    if (noEducationCheckbox) {
        noEducationCheckbox.addEventListener('change', function() {
            const educationFields = document.querySelectorAll('.education-field');
            educationFields.forEach(field => {
                field.required = !this.checked;
                field.disabled = this.checked;
            });
            
            if (this.checked) {
                document.querySelectorAll('.education-field').forEach(f => f.value = '');
            }
        });
    }
   
    const resumeForm = document.getElementById('resume-form');
    if (resumeForm) {
        resumeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const resumeData = collectResumeData();
            saveResumeData(resumeData);
            const xmlString = convertToXML(resumeData);
            downloadXML(xmlString, 'resume.xml');
            window.location.href = 'profile.html';
        });
    }
    

    function collectResumeData() {
        const formData = new FormData(resumeForm);
        const resumeData = {};
        

        resumeData.noExperience = formData.has('no-experience');
        resumeData.noEducation = formData.has('no-education');
        
        for (let [key, value] of formData.entries()) {
            if (key.endsWith('[]')) {
                const fieldName = key.replace('[]', '');
                if (!resumeData[fieldName]) {
                    resumeData[fieldName] = [];
                }
                resumeData[fieldName].push(value);
            } else if (key !== 'no-experience' && key !== 'no-education') {
                resumeData[key] = value;
            }
        }
        
        return resumeData;
    }
    
    function saveResumeData(data) {
        localStorage.setItem('resumeData', JSON.stringify(data));
    }
    
    function convertToXML(data) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<?xml-stylesheet type="text/xsl" href="resume.xsl"?>\n';
        xml += '<resume>\n';
        
      
        xml += `  <basic>\n`;
        xml += `    <fullname>${escapeXML(data.fullname || '')}</fullname>\n`;
        xml += `    <birthdate>${escapeXML(data.birthdate || '')}</birthdate>\n`;
        xml += `    <gender>${escapeXML(data.gender || '')}</gender>\n`;
        xml += `    <position>${escapeXML(data.position || '')}</position>\n`;
        xml += `    <salary>${escapeXML(data.salary || '')}</salary>\n`;
        xml += `    <noExperience>${data.noExperience || 'false'}</noExperience>\n`;
        xml += `  </basic>\n`;
        
        
        xml += `  <contact>\n`;
        xml += `    <phone>${escapeXML(data.phone || '')}</phone>\n`;
        xml += `    <email>${escapeXML(data.email || '')}</email>\n`;
        xml += `    <city>${escapeXML(data.city || '')}</city>\n`;
        xml += `    <address>${escapeXML(data.address || '')}</address>\n`;
        xml += `  </contact>\n`;
        
       
        if (!data.noExperience && data.company && data.company.length > 0) {
            xml += `  <experience>\n`;
            for (let i = 0; i < data.company.length; i++) {
                xml += `    <job>\n`;
                xml += `      <company>${escapeXML(data.company[i] || '')}</company>\n`;
                xml += `      <position>${escapeXML(data['job-title'][i] || '')}</position>\n`;
                xml += `      <start-date>${escapeXML(data['start-date'][i] || '')}</start-date>\n`;
                xml += `      <end-date>${escapeXML(data['end-date'][i] || '')}</end-date>\n`;
                xml += `      <responsibilities>${escapeXML(data.responsibilities[i] || '')}</responsibilities>\n`;
                xml += `    </job>\n`;
            }
            xml += `  </experience>\n`;
        }
        
        
        if (!data.noEducation && data.institution && data.institution.length > 0) {
            xml += `  <education>\n`;
            for (let i = 0; i < data.institution.length; i++) {
                xml += `    <institution>\n`;
                xml += `      <name>${escapeXML(data.institution[i] || '')}</name>\n`;
                xml += `      <specialty>${escapeXML(data.specialty[i] || '')}</specialty>\n`;
                xml += `      <graduation-year>${escapeXML(data['graduation-year'][i] || '')}</graduation-year>\n`;
                xml += `      <degree>${escapeXML(data.degree[i] || '')}</degree>\n`;
                xml += `    </institution>\n`;
            }
            xml += `  </education>\n`;
        }
        
       
        xml += `  <skills>\n`;
        xml += `    <professional>${escapeXML(data.skills || '')}</professional>\n`;
        xml += `    <languages>${escapeXML(data.languages || '')}</languages>\n`;
        xml += `  </skills>\n`;
        
        
        xml += `  <additional>\n`;
        xml += `    <about>${escapeXML(data.about || '')}</about>\n`;
        xml += `    <links>${escapeXML(data.links || '')}</links>\n`;
        xml += `  </additional>\n`;
        
        xml += `  <created>${new Date().toISOString()}</created>\n`;
        xml += '</resume>';
        
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
    
    
    if (window.location.pathname.includes('profile.html')) {
        loadResumeData();
    }
    
    function loadResumeData() {
        const resumeData = JSON.parse(localStorage.getItem('resumeData'));
        if (resumeData) {
          
            if (resumeData.fullname) {
                document.getElementById('profile-name').textContent = resumeData.fullname;
            }
            if (resumeData.position) {
                document.getElementById('profile-position').textContent = resumeData.position;
            }
            if (resumeData.city) {
                const locationEl = document.getElementById('profile-location');
                if (locationEl) {
                    locationEl.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${resumeData.city}`;
                }
            }
            
           
            const resumeTab = document.getElementById('resume-tab');
            if (resumeTab) {
                let html = `
                    <div class="resume-section">
                        <h3>Основная информация</h3>
                        <div class="resume-info">
                            <p><strong>ФИО:</strong> ${resumeData.fullname || 'Не указано'}</p>
                            ${resumeData.birthdate ? `<p><strong>Дата рождения:</strong> ${new Date(resumeData.birthdate).toLocaleDateString()}</p>` : ''}
                            <p><strong>Пол:</strong> ${getGenderText(resumeData.gender)}</p>
                            <p><strong>Желаемая должность:</strong> ${resumeData.position || 'Не указана'}</p>
                            ${resumeData.salary ? `<p><strong>Ожидаемая зарплата:</strong> ${resumeData.salary} руб.</p>` : ''}
                        </div>
                    </div>
                    
                    <div class="resume-section">
                        <h3>Контактная информация</h3>
                        <div class="resume-info">
                            <p><strong>Телефон:</strong> ${resumeData.phone || 'Не указан'}</p>
                            <p><strong>Email:</strong> ${resumeData.email || 'Не указан'}</p>
                            <p><strong>Город:</strong> ${resumeData.city || 'Не указан'}</p>
                            ${resumeData.address ? `<p><strong>Адрес:</strong> ${resumeData.address}</p>` : ''}
                        </div>
                    </div>
                `;
                
                
                if (resumeData.company && resumeData.company.length > 0) {
                    html += `<div class="resume-section">
                        <h3>Опыт работы</h3>`;
                    
                    for (let i = 0; i < resumeData.company.length; i++) {
                        html += `
                            <div class="experience-item">
                                <h4>${resumeData['job-title'][i] || 'Должность не указана'}</h4>
                                <p><strong>Компания:</strong> ${resumeData.company[i] || 'Не указана'}</p>
                                <p><strong>Период работы:</strong> 
                                    ${resumeData['start-date'][i] ? new Date(resumeData['start-date'][i]).toLocaleDateString() : 'Не указано'} - 
                                    ${resumeData['end-date'][i] ? new Date(resumeData['end-date'][i]).toLocaleDateString() : 'по настоящее время'}
                                </p>
                                ${resumeData.responsibilities[i] ? `<p><strong>Обязанности:</strong> ${resumeData.responsibilities[i]}</p>` : ''}
                            </div>
                        `;
                    }
                    
                    html += `</div>`;
                }
                
            
                if (resumeData.institution && resumeData.institution.length > 0) {
                    html += `<div class="resume-section">
                        <h3>Образование</h3>`;
                    
                    for (let i = 0; i < resumeData.institution.length; i++) {
                        html += `
                            <div class="education-item">
                                <h4>${resumeData.institution[i] || 'Учебное заведение не указано'}</h4>
                                <p><strong>Специальность:</strong> ${resumeData.specialty[i] || 'Не указана'}</p>
                                <p><strong>Год окончания:</strong> ${resumeData['graduation-year'][i] || 'Не указан'}</p>
                                ${resumeData.degree[i] ? `<p><strong>Степень:</strong> ${resumeData.degree[i]}</p>` : ''}
                            </div>
                        `;
                    }
                    
                    html += `</div>`;
                }
                
                
                if (resumeData.skills || resumeData.languages) {
                    html += `<div class="resume-section">
                        <h3>Навыки</h3>
                        <div class="resume-info">`;
                    
                    if (resumeData.skills) {
                        html += `<p><strong>Профессиональные навыки:</strong><br>${resumeData.skills.split(',').map(skill => `• ${skill.trim()}`).join('<br>')}</p>`;
                    }
                    
                    if (resumeData.languages) {
                        html += `<p><strong>Языки:</strong><br>${resumeData.languages.split(',').map(lang => `• ${lang.trim()}`).join('<br>')}</p>`;
                    }
                    
                    html += `</div></div>`;
                }
                
                
                if (resumeData.about || resumeData.links) {
                    html += `<div class="resume-section">
                        <h3>Дополнительная информация</h3>
                        <div class="resume-info">`;
                    
                    if (resumeData.about) {
                        html += `<p><strong>О себе:</strong><br>${resumeData.about}</p>`;
                    }
                    
                    if (resumeData.links) {
                        html += `<p><strong>Ссылки:</strong><br>${resumeData.links.split(',').map(link => {
                            const trimmed = link.trim();
                            return `<a href="${trimmed}" target="_blank">${trimmed}</a>`;
                        }).join('<br>')}</p>`;
                    }
                    
                    html += `</div></div>`;
                }
                
                resumeTab.innerHTML = html;
            }
        }
    }
    
    function getGenderText(gender) {
        switch(gender) {
            case 'male': return 'Мужской';
            case 'female': return 'Женский';
            case 'other': return 'Другой';
            default: return 'Не указан';
        }
    }
});