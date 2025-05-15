<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<head>
    <title>Вакансия</title>
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
            width: 200px;
            vertical-align: top;
        }
        .value {
            display: inline-block;
            width: calc(100% - 220px);
        }
        .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 5px;
        }
        .vacancy-title {
            font-size: 20px;
            color: #e74c3c;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="company-name"><xsl:value-of select="vacancy/company/name"/></div>
    <div class="info-item">
        <span class="label">Сфера деятельности:</span>
        <span class="value"><xsl:value-of select="vacancy/company/description"/></span>
    </div>
    
    <div class="vacancy-title"><xsl:value-of select="vacancy/info/title"/></div>
    
    <div class="section">
        <h2>О вакансии</h2>
        <div class="info-item">
            <span class="label">Описание:</span>
            <span class="value"><xsl:value-of select="vacancy/info/description"/></span>
        </div>
        <div class="info-item">
            <span class="label">Требования:</span>
            <span class="value"><xsl:value-of select="vacancy/info/requirements"/></span>
        </div>
        <div class="info-item">
            <span class="label">Обязанности:</span>
            <span class="value"><xsl:value-of select="vacancy/info/responsibilities"/></span>
        </div>
        <div class="info-item">
            <span class="label">Условия:</span>
            <span class="value"><xsl:value-of select="vacancy/info/conditions"/></span>
        </div>
    </div>

    <div class="section">
        <h2>Детали вакансии</h2>
        <div class="info-item">
            <span class="label">Зарплата:</span>
            <span class="value"><xsl:value-of select="vacancy/details/salary"/> BYN</span>
        </div>
        <div class="info-item">
            <span class="label">Тип занятости:</span>
            <span class="value">
                <xsl:choose>
                    <xsl:when test="vacancy/details/employment = 'remote'">Удалённая работа</xsl:when>
                    <xsl:otherwise>Офисная работа</xsl:otherwise>
                </xsl:choose>
            </span>
        </div>
        <div class="info-item">
            <span class="label">Опыт работы:</span>
            <span class="value">
                <xsl:choose>
                    <xsl:when test="vacancy/details/experience = '1-3'">1-3 года</xsl:when>
                    <xsl:otherwise><xsl:value-of select="vacancy/details/experience"/></xsl:otherwise>
                </xsl:choose>
            </span>
        </div>
        <div class="info-item">
            <span class="label">Образование:</span>
            <span class="value">
                <xsl:choose>
                    <xsl:when test="vacancy/details/education = 'any'">Любое</xsl:when>
                    <xsl:otherwise><xsl:value-of select="vacancy/details/education"/></xsl:otherwise>
                </xsl:choose>
            </span>
        </div>
        <div class="info-item">
            <span class="label">Местоположение:</span>
            <span class="value">
                <xsl:value-of select="vacancy/details/location/city"/>, 
                <xsl:value-of select="vacancy/details/location/address"/>
            </span>
        </div>
    </div>

    <div class="section">
        <h2>Контакты компании</h2>
        <div class="info-item">
            <span class="label">Веб-сайт:</span>
            <span class="value">
                <a href="{vacancy/company/website}"><xsl:value-of select="vacancy/company/website"/></a>
            </span>
        </div>
        <div class="info-item">
            <span class="label">Email:</span>
            <span class="value">
                <a href="mailto:{vacancy/company/email}"><xsl:value-of select="vacancy/company/email"/></a>
            </span>
        </div>
        <div class="info-item">
            <span class="label">Телефон:</span>
            <span class="value"><xsl:value-of select="vacancy/company/phone"/></span>
        </div>
    </div>

    <div class="info-item">
        <span class="label">Дата публикации:</span>
        <span class="value"><xsl:value-of select="vacancy/details/created"/></span>
    </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>