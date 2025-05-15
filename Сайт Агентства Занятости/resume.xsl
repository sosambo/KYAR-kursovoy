<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<head>
    <title>Резюме</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            color: #333;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        h2 {
            color: #3498db;
            margin-top: 20px;
        }
        .section {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 5px;
        }
        .info-item {
            margin-bottom: 10px;
        }
        .label {
            font-weight: bold;
            display: inline-block;
            width: 150px;
        }
    </style>
</head>
<body>
    <h1><xsl:value-of select="resume/basic/fullname"/></h1>
    <div class="section">
        <h2>Основная информация</h2>
        <div class="info-item">
            <span class="label">Дата рождения:</span>
            <xsl:value-of select="resume/basic/birthdate"/>
        </div>
        <div class="info-item">
            <span class="label">Пол:</span>
            <xsl:value-of select="resume/basic/gender"/>
        </div>
        <div class="info-item">
            <span class="label">Должность:</span>
            <xsl:value-of select="resume/basic/position"/>
        </div>
        <div class="info-item">
            <span class="label">Зарплата:</span>
            <xsl:value-of select="resume/basic/salary"/>
        </div>
        <div class="info-item">
            <span class="label">Опыт работы:</span>
            <xsl:choose>
                <xsl:when test="resume/basic/noExperience = 'true'">Нет опыта</xsl:when>
                <xsl:otherwise>Есть опыт</xsl:otherwise>
            </xsl:choose>
        </div>
    </div>

    <div class="section">
        <h2>Контактная информация</h2>
        <div class="info-item">
            <span class="label">Телефон:</span>
            <xsl:value-of select="resume/contact/phone"/>
        </div>
        <div class="info-item">
            <span class="label">Email:</span>
            <xsl:value-of select="resume/contact/email"/>
        </div>
        <div class="info-item">
            <span class="label">Город:</span>
            <xsl:value-of select="resume/contact/city"/>
        </div>
        <div class="info-item">
            <span class="label">Адрес:</span>
            <xsl:value-of select="resume/contact/address"/>
        </div>
    </div>

    <div class="section">
        <h2>Образование</h2>
        <div class="info-item">
            <span class="label">Учреждение:</span>
            <xsl:value-of select="resume/education/institution/name"/>
        </div>
        <div class="info-item">
            <span class="label">Специальность:</span>
            <xsl:value-of select="resume/education/institution/specialty"/>
        </div>
        <div class="info-item">
            <span class="label">Год окончания:</span>
            <xsl:value-of select="resume/education/institution/graduation-year"/>
        </div>
        <div class="info-item">
            <span class="label">Степень:</span>
            <xsl:value-of select="resume/education/institution/degree"/>
        </div>
    </div>

    <div class="section">
        <h2>Навыки</h2>
        <div class="info-item">
            <span class="label">Профессиональные:</span>
            <xsl:value-of select="resume/skills/professional"/>
        </div>
        <div class="info-item">
            <span class="label">Языки:</span>
            <xsl:value-of select="resume/skills/languages"/>
        </div>
    </div>

    <div class="section">
        <h2>Дополнительно</h2>
        <div class="info-item">
            <span class="label">О себе:</span>
            <xsl:value-of select="resume/additional/about"/>
        </div>
    </div>

    <div class="info-item">
        <span class="label">Дата создания резюме:</span>
        <xsl:value-of select="resume/created"/>
    </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>