"use client";
import React, { useEffect, useRef } from "react";

type DataRow = {
  halbjahr: string;
  branche: number;
  sirius: number;
};

type MarketShareRow = DataRow & { marketShare: number };

type TranslationObject = Record<string, string>;

type Theme = 'light' | 'dark' | 'system';
type Language = 'de' | 'en' | 'tr' | 'ro' | 'sy' | 'ar' | 'ru' | 'pl' | 'at' | 'ch' | 'nl' | 'cz' | 'sk' | 'md';

// Language translations
const translations = {
  de: {
    title: "Business Analytics Übungen",
    availableExercises: "Verfügbare Übungen",
    exercise1Title: "Sirius AG Marktanteil Analyse",
    exercise1Desc: "Marktanteilsberechnung und Trendanalyse für ein deutsches Unternehmen über mehrere Halbjahre.",
    exercise2Title: "Kundenbefragung Auswertung",
    exercise2Desc: "Auswertung von Kundenbewertungen nach Schulnotensystem mit statistischer Analyse.",
    startExercise: "Übung starten",
    backToMenu: "Zurück zum Menü",
    showTask: "Aufgabe anzeigen",
    hideTask: "Aufgabe ausblenden",
    showData: "Daten anzeigen",
    hideData: "Daten ausblenden",
    showTable: "Tabelle anzeigen",
    showSolution: "Lösung anzeigen",
    selectExercise: "Wählen Sie eine Übung aus, um zu beginnen",
    theme: "Design",
    language: "Sprache",
    light: "Hell",
    dark: "Dunkel",
    system: "System",
    // Sirius Exercise
    taskStatement: "Aufgabenstellung",
    siriusTask: "Sie sind bei der Sirius AG beschäftigt und sollen eine Marktanteilsanalyse für die letzten drei Jahre durchführen.",
    dataAvailable: "Ihnen liegen folgende Umsatzdaten vor:",
    period: "Halbjahr",
    industry: "Branche (€ Mio)",
    sirius: "Sirius AG (€ Mio)",
    taskA: "In welchem Halbjahr hatte die Sirius AG den höchsten Marktanteil?",
    taskB: "In welchem Halbjahr hatte die Sirius AG die höchste prozentuale Steigerung des Marktanteils?",
    taskLabelA: "Aufgabe a)",
    taskLabelB: "Aufgabe b)",
    marketData: "Marktdaten",
    calculatedShares: "Berechnete Marktanteile",
    calculationBasis: "Berechnungsgrundlage",
    basicFormula: "Grundformel:",
    exampleCalc: "Beispielberechnung für 1. Halbj. 01:",
    marketShareFormula: "Marktanteil = (Umsatz des Unternehmens / Gesamtumsatz der Branche) × 100",
    solutionA: "Lösung a) anzeigen",
    solutionB: "Lösung b) anzeigen",
    solutionAHide: "Lösung a) ausblenden",
    solutionBHide: "Lösung b) ausblenden",
    solutionATitle: "Lösung a) Höchster Marktanteil",
    solutionBTitle: "Lösung b) Höchste prozentuale Steigerung",
    showCalculatedShares: "Berechnete Marktanteile anzeigen",
    hideCalculatedShares: "Berechnete Marktanteile ausblenden",
    showCompleteAnalysis: "Vollständige Analyse anzeigen",
    hideCompleteAnalysis: "Vollständige Analyse ausblenden",
    showTableCustomer: "Tabelle anzeigen",
    showSolutionCustomer: "Lösung anzeigen",
    showOverallAnalysis: "📊 Gesamtanalyse anzeigen",
    // Customer Exercise
    customerSurvey: "Kundenbefragung",
    surveyDescription: "Zur Verbesserung der Kundenzufriedenheit wurde eine Kundenbefragung durchgeführt. Sie sollen die Antworten der zehn wichtigsten Kunden nach folgenden Kriterien auswerten und ermitteln.",
    gradeSystem: "Bewertung hier in Schulnoten (1 = sehr gut, 6 = ungenügend).",
    tasks: "Aufgaben:",
    taskCustomerA: "Wie viel Prozent haben im Durchschnitt der vier Einzelbewertungen gut und besser bewertet?",
    taskCustomerB: "Wie viel Prozent haben im Durchschnitt der vier Einzelbewertungen ausreichend und schlechter bewertet?",
    taskCustomerC: "Welche Durchschnittsnote für die Berücksichtigung ökologischer Aspekte (Öko) wurde in den Produkten vergeben?",
    // Solution labels
    solutionALabel: "Lösung a) Gut und besser",
    solutionBLabel: "Lösung b) Ausreichend und schlechter",
    solutionCLabel: "Lösung c) Ökologische Aspekte",
    // Rating categories
    goodAndBetter: "gut und besser",
    satisfactoryAndWorse: "ausreichend und schlechter", 
    ecologicalAspects: "Ökologische Aspekte",
    // Analysis terms
    customersWithAverage: "Kunden mit Durchschnittsnote",
    numberOfCustomers: "Anzahl Kunden mit",
    haveRated: "haben",
    rated: "bewertet",
    averageGrade: "Durchschnittsnote",
    ecoAverageGrade: "Öko-Durchschnittsnote",
    analysis: "Auswertung",
    // Overall analysis
    overallAnalysisTitle: "📊 Gesamtanalyse der Kundenbefragung",
    majorityOfCustomers: "Die Mehrheit der Kunden",
    ratedGoodOrBetter: "bewertete das Unternehmen gut oder besser",
    onlyPercentage: "Nur",
    gaveSatisfactoryOrWorse: "der Kunden gaben ausreichende oder schlechtere Bewertungen",
    ecoAspectsRated: "Die ökologischen Aspekte wurden mit",
    correspondTo: "bewertet - das entspricht",
    recommendation: "Empfehlung:",
    improveEcoAspects: "Verbesserung der ökologischen Aspekte könnte die Gesamtzufriedenheit steigern",
    ecoAspectsAlreadyGood: "Ökologische Aspekte sind bereits gut bewertet",
    interpretation: "Interpretation:",
    calculation: "Berechnung:",
    calculationExplanation: "Erklärung der Berechnung:",
    totalCustomers: "Gesamtanzahl Kunden:",
    sumOfRatings: "Summe der Öko-Bewertungen:",
    allCustomersEcoRatings: "Öko-Bewertungen aller Kunden:",
    result: "Ergebnis:",
    noCustomers: "Keine Kunden",
    // Period translations
    firstHalf: "1. Halbj.",
    secondHalf: "2. Halbj.",
    // Solution answer texts
    hadHighestMarketShare: "hatte den höchsten Marktanteil mit",
    formula: "Formel:",
    example: "Beispiel für",
    meaning: "Bedeutung:",
    strongestMarketPosition: "Dies zeigt die stärkste Marktposition der Sirius AG im gesamten Betrachtungszeitraum.",
    showsStrongestPosition: "zeigt die stärkste Marktposition",
    largestPercentageIncrease: "Die größte prozentuale Steigerung erfolgte von",
    withIncrease: "mit einer Steigerung von",
    notAvailable: "Nicht verfügbar.",
    to: "zu",
    exercise1: "Übung 1",
    exercise2: "Übung 2",
    marketAnalysis: "Marktanalyse",
    customerSatisfaction: "Kundenzufriedenheit",
    statistics: "Statistik",
    averageValues: "Durchschnittswerte",
    industryRevenueMio: "Branche (€ Mio)",
    siriusRevenueMio: "Sirius AG (€ Mio)",
    marketSharePercent: "Marktanteil (%)",
    increasePercent: "Anstieg (%)",
    stepByStepAnalysis: "Vollständige Schritt-für-Schritt-Analyse",
    methodicalApproach: "Methodisches Vorgehen:",
    importantInsights: "Wichtige Erkenntnisse:",
    highestMarketShare: "Höchster Marktanteil:",
    calculateIncreaseRates: "Steigerungsraten berechnen:",
    percentageChanges: "Prozentuale Veränderungen zwischen aufeinanderfolgenden Perioden",
    meaningLargestGrowth: "Dies zeigt den größten relativen Wachstumsschub der Sirius AG im Marktanteil.",
    strongestIncrease: "Stärkste Steigerung:",
    trendAnalysis: "Trend-Analyse:",
    continuousGrowth: "Kontinuierliches Wachstum des Marktanteils über den Betrachtungszeitraum erkennbar",
    businessRelevance: "Geschäftsrelevanz:",
    positiveMarketDevelopment: "Positive Marktentwicklung unterstützt strategische Geschäftsentscheidungen",
    taskDescription: "Aufgabenstellung",
    ratingLegend: "Bewertungslegende",
    customer: "Kunde",
    function: "Funktion",
    performance: "Leistung",
    eco: "Öko",
    price: "Preis",
    average: "Durchschnitt",
    summary: "Zusammenfassung",
    surveyResults: "Ergebnisse der Kundenbefragung:",
    goodAndBetterShort: "Gut und besser",
    satisfactoryAndWorseShort: "Ausreichend und schlechter",
    ecoAverage: "Öko-Durchschnitt",
    showsDynamicDevelopment: "Wachstum - zeigt dynamischste Entwicklung",
    with: "mit",
    gradeVeryGood: "sehr gut",
    gradeGood: "gut", 
    gradeSatisfactory: "befriedigend",
    gradeAdequate: "ausreichend",
    gradeDeficient: "mangelhaft",
    gradeInsufficient: "ungenügend",
    gradeUnknown: "Unbekannt",
    gradeLabelVeryGood: "Sehr gut",
    gradeLabelGood: "Gut",
    gradeLabelSatisfactory: "Befriedigend", 
    gradeLabelAdequate: "Ausreichend",
    gradeLabelDeficient: "Mangelhaft",
    gradeLabelInsufficient: "Ungenügend",
    percentageIncreaseFormula: "Prozentuale Steigerung = (neuer Wert - alter Wert) / alter Wert × 100",
    absoluteIncrease: "Absolute Steigerung:",
    percentagePoints: "Prozentpunkte",
    dataCollection: "Datenaufnahme:",
    collectRevenueData: "Sammlung der Umsatzdaten für Branche und Sirius AG über 6 Halbjahre",
    calculateMarketShare: "Marktanteil berechnen:",
    applyFormula: "Anwendung der Formel: (Sirius AG / Branche) × 100 für jedes Halbjahr",
    identifyMaximum: "Maximum identifizieren:",
    compareAllShares: "Vergleich aller Marktanteile zur Bestimmung des höchsten Wertes",
    basicFormulaText: "Marktanteil = (Umsatz des Unternehmens / Gesamtumsatz der Branche) × 100",
    percentageCalculation: "Prozentrechnung",
    trendCalculation: "Trendberechnung",
    // Table and calculation terms
    siriusRevenue: "Sirius AG Umsatz",
    industryRevenue: "Branchenumsatz",
    marketShareTerm: "Marktanteil",
    dataType: "Datentyp",
    // Step by step explanations
    collectBaseData: "Ausgangsdaten sammeln",
    calculateIncrease: "Anstieg berechnen",
    percentageIncreaseFormula2: "Prozentuale Steigerung = (Neuer Marktanteil - Alter Marktanteil) / Alter Marktanteil × 100",
    marketShareFormulaSpecific: "Marktanteil = (Sirius AG Umsatz / Branchenumsatz) × 100",
    stepByStepExplanation: "Schritt-für-Schritt Erklärung:",
    step1: "Ausgangsdaten sammeln:",
    step1Description: "Branchenumsatz und Sirius AG Umsatz für jedes Halbjahr",
    step2: "Marktanteil pro Periode berechnen:",
    step2Description: "(Sirius AG / Branche) × 100",
    step3: "Prozentuale Steigerung ermitteln:",
    step3Description: "Vergleich mit der vorherigen Periode",
    step4: "Ergebnisse interpretieren:",
    step4Description: "Trends und Entwicklungen identifizieren"
  },
  en: {
    title: "Business Analytics Exercises",
    availableExercises: "Available Exercises",
    exercise1Title: "Sirius AG Market Share Analysis",
    exercise1Desc: "Market share calculation and trend analysis for a German company over multiple half-years.",
    exercise2Title: "Customer Survey Evaluation",
    exercise2Desc: "Evaluation of customer ratings using school grading system with statistical analysis.",
    startExercise: "Start Exercise",
    backToMenu: "Back to Menu",
    showTask: "Show Task",
    hideTask: "Hide Task",
    showData: "Show Data",
    hideData: "Hide Data",
    showTable: "Show Table",
    showSolution: "Show Solution",
    selectExercise: "Select an exercise to begin",
    theme: "Theme",
    language: "Language",
    light: "Light",
    dark: "Dark",
    system: "System",
    // Sirius Exercise
    taskStatement: "Task Statement",
    siriusTask: "You are employed at Sirius AG and should conduct a market share analysis for the last three years.",
    dataAvailable: "The following sales data is available to you:",
    period: "Half-year",
    industry: "Industry (€ Million)",
    sirius: "Sirius AG (€ Million)",
    taskA: "In which half-year did Sirius AG have the highest market share?",
    taskB: "In which half-year did Sirius AG have the highest percentage increase in market share?",
    taskLabelA: "Task a)",
    taskLabelB: "Task b)",
    marketData: "Market Data",
    calculatedShares: "Calculated Market Shares",
    calculationBasis: "Calculation Basis",
    basicFormula: "Basic Formula:",
    exampleCalc: "Example calculation for 1st Half 01:",
    marketShareFormula: "Market Share = (Company Revenue / Total Industry Revenue) × 100",
    solutionA: "Show Solution a)",
    solutionB: "Show Solution b)",
    solutionAHide: "Hide Solution a)",
    solutionBHide: "Hide Solution b)",
    solutionATitle: "Solution a) Highest Market Share",
    solutionBTitle: "Solution b) Highest Percentage Increase",
    showCalculatedShares: "Show Calculated Market Shares",
    hideCalculatedShares: "Hide Calculated Market Shares",
    showCompleteAnalysis: "Show Complete Analysis",
    hideCompleteAnalysis: "Hide Complete Analysis",
    showTableCustomer: "Show Table",
    showSolutionCustomer: "Show Solution",
    showOverallAnalysis: "📊 Show Overall Analysis",
    // Customer Exercise
    customerSurvey: "Customer Survey",
    surveyDescription: "A customer survey was conducted to improve customer satisfaction. You should evaluate the responses of the ten most important customers according to the following criteria.",
    gradeSystem: "Rating using school grades (1 = very good, 6 = insufficient).",
    tasks: "Tasks:",
    taskCustomerA: "What percentage rated good or better on average across the four individual evaluations?",
    taskCustomerB: "What percentage rated satisfactory or worse on average across the four individual evaluations?",
    taskCustomerC: "What average grade was given for the consideration of ecological aspects (Eco) in the products?",
    // Solution labels
    solutionALabel: "Solution a) Good and better",
    solutionBLabel: "Solution b) Satisfactory and worse",
    solutionCLabel: "Solution c) Ecological aspects",
    // Rating categories
    goodAndBetter: "good and better",
    satisfactoryAndWorse: "satisfactory and worse", 
    ecologicalAspects: "Ecological aspects",
    // Analysis terms
    customersWithAverage: "Customers with average grade",
    numberOfCustomers: "Number of customers with",
    haveRated: "have",
    rated: "rated",
    averageGrade: "average grade",
    ecoAverageGrade: "Eco average grade",
    analysis: "Analysis",
    // Overall analysis
    overallAnalysisTitle: "📊 Overall Customer Survey Analysis",
    majorityOfCustomers: "The majority of customers",
    ratedGoodOrBetter: "rated the company good or better",
    onlyPercentage: "Only",
    gaveSatisfactoryOrWorse: "of customers gave satisfactory or worse ratings",
    ecoAspectsRated: "The ecological aspects were rated",
    correspondTo: "- this corresponds to",
    recommendation: "Recommendation:",
    improveEcoAspects: "Improving ecological aspects could increase overall satisfaction",
    ecoAspectsAlreadyGood: "Ecological aspects are already well rated",
    interpretation: "Interpretation:",
    calculation: "Calculation:",
    calculationExplanation: "Calculation explanation:",
    totalCustomers: "Total customers:",
    sumOfRatings: "Sum of eco ratings:",
    allCustomersEcoRatings: "Eco ratings of all customers:",
    result: "Result:",
    noCustomers: "No customers",
    // Period translations
    firstHalf: "1st Half",
    secondHalf: "2nd Half",
    // Solution answer texts
    hadHighestMarketShare: "had the highest market share with",
    formula: "Formula:",
    example: "Example for",
    meaning: "Meaning:",
    strongestMarketPosition: "This shows the strongest market position of Sirius AG in the entire observation period.",
    showsStrongestPosition: "shows the strongest market position",
    largestPercentageIncrease: "The largest percentage increase occurred from",
    withIncrease: "with an increase of",
    notAvailable: "Not available.",
    to: "to",
    exercise1: "Exercise 1",
    exercise2: "Exercise 2",
    marketAnalysis: "Market Analysis",
    customerSatisfaction: "Customer Satisfaction",
    statistics: "Statistics",
    averageValues: "Average Values",
    industryRevenueMio: "Industry (€ Mio)",
    siriusRevenueMio: "Sirius AG (€ Mio)",
    marketSharePercent: "Market Share (%)",
    increasePercent: "Increase (%)",
    stepByStepAnalysis: "Complete Step-by-Step Analysis",
    methodicalApproach: "Methodical Approach:",
    importantInsights: "Important Insights:",
    highestMarketShare: "Highest Market Share:",
    calculateIncreaseRates: "Calculate increase rates:",
    percentageChanges: "Percentage changes between consecutive periods",
    meaningLargestGrowth: "This shows the largest relative growth boost of Sirius AG in market share.",
    strongestIncrease: "Strongest Increase:",
    trendAnalysis: "Trend Analysis:",
    continuousGrowth: "Continuous growth of market share observable over the observation period",
    businessRelevance: "Business Relevance:",
    positiveMarketDevelopment: "Positive market development supports strategic business decisions",
    taskDescription: "Task Description",
    ratingLegend: "Rating Legend",
    customer: "Customer",
    function: "Function",
    performance: "Performance", 
    eco: "Eco",
    price: "Price",
    average: "Average",
    summary: "Summary",
    surveyResults: "Customer Survey Results:",
    goodAndBetterShort: "Good and better",
    satisfactoryAndWorseShort: "Satisfactory and worse",
    ecoAverage: "Eco Average",
    showsDynamicDevelopment: "growth - shows most dynamic development",
    with: "with",
    gradeVeryGood: "very good",
    gradeGood: "good",
    gradeSatisfactory: "satisfactory", 
    gradeAdequate: "adequate",
    gradeDeficient: "deficient",
    gradeInsufficient: "insufficient",
    gradeUnknown: "Unknown",
    gradeLabelVeryGood: "Very Good",
    gradeLabelGood: "Good",
    gradeLabelSatisfactory: "Satisfactory",
    gradeLabelAdequate: "Adequate", 
    gradeLabelDeficient: "Deficient",
    gradeLabelInsufficient: "Insufficient",
    percentageIncreaseFormula: "Percentage increase = (new value - old value) / old value × 100",
    absoluteIncrease: "Absolute increase:",
    percentagePoints: "percentage points",
    dataCollection: "Data collection:",
    collectRevenueData: "Collection of revenue data for industry and Sirius AG over 6 half-years",
    calculateMarketShare: "Calculate market share:",
    applyFormula: "Application of formula: (Sirius AG / Industry) × 100 for each half-year",
    identifyMaximum: "Identify maximum:",
    compareAllShares: "Comparison of all market shares to determine the highest value",
    basicFormulaText: "Market share = (Company revenue / Total industry revenue) × 100",
    percentageCalculation: "Percentage calculation",
    trendCalculation: "Trend calculation",
    // Table and calculation terms
    siriusRevenue: "Sirius AG Revenue",
    industryRevenue: "Industry Revenue",
    marketShareTerm: "Market Share",
    dataType: "Data Type",
    // Step by step explanations
    collectBaseData: "Collect base data",
    calculateIncrease: "Calculate increase",
    percentageIncreaseFormula2: "Percentage increase = (New market share - Old market share) / Old market share × 100",
    marketShareFormulaSpecific: "Market Share = (Sirius AG Revenue / Industry Revenue) × 100",
    stepByStepExplanation: "Step-by-Step Explanation:",
    step1: "Collect base data:",
    step1Description: "Industry revenue and Sirius AG revenue for each half-year",
    step2: "Calculate market share per period:",
    step2Description: "(Sirius AG / Industry) × 100",
    step3: "Determine percentage increase:",
    step3Description: "Comparison with the previous period",
    step4: "Interpret results:",
    step4Description: "Identify trends and developments"
  },
  tr: {
    title: "İş Analitiği Alıştırmaları",
    availableExercises: "Mevcut Alıştırmalar",
    exercise1Title: "Sirius AG Pazar Payı Analizi",
    exercise1Desc: "Alman şirketi için yarı yıl bazında pazar payı hesaplama ve trend analizi.",
    exercise2Title: "Müşteri Anketi Değerlendirmesi",
    exercise2Desc: "Okul not sistemi kullanarak müşteri değerlendirmelerinin istatistiksel analizi.",
    startExercise: "Alıştırmayı Başlat",
    backToMenu: "Menüye Dön",
    showTask: "Görevi Göster",
    hideTask: "Görevi Gizle",
    showData: "Verileri Göster",
    hideData: "Verileri Gizle",
    showTable: "Tabloyu Göster",
    showSolution: "Çözümü Göster",
    selectExercise: "Başlamak için bir alıştırma seçin",
    theme: "Tema",
    language: "Dil",
    light: "Açık",
    dark: "Koyu",
    system: "Sistem",
    // Sirius Exercise
    taskStatement: "Görev Tanımı",
    siriusTask: "Sirius AG'de çalışmaktasınız ve son üç yıl için pazar payı analizi yapmalısınız.",
    dataAvailable: "Aşağıdaki satış verileri sizin için mevcuttur:",
    period: "Yarı Yıl",
    industry: "Sektör (€ Milyon)",
    sirius: "Sirius AG (€ Milyon)",
    taskA: "Sirius AG hangi yarı yılda en yüksek pazar payına sahipti?",
    taskB: "Sirius AG hangi yarı yılda pazar payında en yüksek yüzdelik artışa sahipti?",
    taskLabelA: "Görev a)",
    taskLabelB: "Görev b)",
    marketData: "Pazar Verileri",
    calculatedShares: "Hesaplanan Pazar Payları",
    calculationBasis: "Hesaplama Temeli",
    basicFormula: "Temel Formül:",
    exampleCalc: "1. Yarı 01 için örnek hesaplama:",
    marketShareFormula: "Pazar Payı = (Şirket Geliri / Toplam Sektör Geliri) × 100",
    solutionA: "Çözüm a) göster",
    solutionB: "Çözüm b) göster",
    solutionAHide: "Çözüm a) gizle",
    solutionBHide: "Çözüm b) gizle",
    solutionATitle: "Çözüm a) En Yüksek Pazar Payı",
    solutionBTitle: "Çözüm b) En Yüksek Yüzdelik Artış",
    showCalculatedShares: "Hesaplanan Pazar Paylarını Göster",
    hideCalculatedShares: "Hesaplanan Pazar Paylarını Gizle",
    showCompleteAnalysis: "Tam Analizi Göster",
    hideCompleteAnalysis: "Tam Analizi Gizle",
    showTableCustomer: "Tabloyu Göster",
    showSolutionCustomer: "Çözümü Göster",
    showOverallAnalysis: "📊 Genel Analizi Göster",
    // Customer Exercise
    customerSurvey: "Müşteri Anketi",
    surveyDescription: "Müşteri memnuniyetini artırmak için bir müşteri anketi yapıldı. En önemli on müşterinin yanıtlarını aşağıdaki kriterlere göre değerlendirmelisiniz.",
    gradeSystem: "Okul notları kullanılarak derecelendirme (1 = çok iyi, 6 = yetersiz).",
    tasks: "Görevler:",
    taskCustomerA: "Dört bireysel değerlendirmenin ortalamasında yüzde kaçı iyi veya daha iyi not verdi?",
    taskCustomerB: "Dört bireysel değerlendirmenin ortalamasında yüzde kaçı yeterli veya daha kötü not verdi?",
    taskCustomerC: "Ürünlerde ekolojik yönlerin (Eko) dikkate alınması için hangi ortalama not verildi?",
    // Solution labels
    solutionALabel: "Çözüm a) İyi ve daha iyi",
    solutionBLabel: "Çözüm b) Yeterli ve daha kötü",
    solutionCLabel: "Çözüm c) Ekolojik yönler",
    // Rating categories
    goodAndBetter: "iyi ve daha iyi",
    satisfactoryAndWorse: "yeterli ve daha kötü", 
    ecologicalAspects: "Ekolojik yönler",
    // Analysis terms
    customersWithAverage: "Ortalama notu olan müşteriler",
    numberOfCustomers: "Müşteri sayısı",
    haveRated: "değerlendirdi",
    rated: "not verdi",
    averageGrade: "ortalama not",
    ecoAverageGrade: "Eko ortalama not",
    analysis: "Analiz",
    // Overall analysis
    overallAnalysisTitle: "📊 Genel Müşteri Anketi Analizi",
    majorityOfCustomers: "Müşterilerin çoğunluğu",
    ratedGoodOrBetter: "şirketi iyi veya daha iyi olarak değerlendirdi",
    onlyPercentage: "Sadece",
    gaveSatisfactoryOrWorse: "müşteri yeterli veya daha kötü değerlendirme verdi",
    ecoAspectsRated: "Ekolojik yönler",
    correspondTo: "olarak değerlendirildi - bu şuna karşılık gelir",
    recommendation: "Öneri:",
    improveEcoAspects: "Ekolojik yönlerin iyileştirilmesi genel memnuniyeti artırabilir",
    ecoAspectsAlreadyGood: "Ekolojik yönler zaten iyi değerlendirilmiş",
    interpretation: "Yorum:",
    calculation: "Hesaplama:",
    calculationExplanation: "Hesaplama açıklaması:",
    totalCustomers: "Toplam müşteri:",
    sumOfRatings: "Eko değerlendirmelerinin toplamı:",
    allCustomersEcoRatings: "Tüm müşterilerin eko değerlendirmeleri:",
    result: "Sonuç:",
    noCustomers: "Müşteri yok",
    // Period translations
    firstHalf: "1. Yarıyıl",
    secondHalf: "2. Yarıyıl",
    // Solution answer texts
    hadHighestMarketShare: "en yüksek pazar payına sahipti",
    formula: "Formül:",
    example: "Örnek",
    meaning: "Anlamı:",
    strongestMarketPosition: "Bu, Sirius AG'nin tüm gözlem dönemindeki en güçlü pazar konumunu gösterir.",
    showsStrongestPosition: "en güçlü pazar konumunu gösterir",
    largestPercentageIncrease: "En büyük yüzdelik artış şuradan gerçekleşti",
    withIncrease: "artışı ile",
    notAvailable: "Mevcut değil.",
    to: "için",
    exercise1: "Alıştırma 1",
    exercise2: "Alıştırma 2",
    marketAnalysis: "Pazar Analizi",
    customerSatisfaction: "Müşteri Memnuniyeti",
    statistics: "İstatistik",
    averageValues: "Ortalama Değerler",
    industryRevenueMio: "Sektör (€ Milyon)",
    siriusRevenueMio: "Sirius AG (€ Milyon)",
    marketSharePercent: "Pazar Payı (%)",
    increasePercent: "Artış (%)",
    stepByStepAnalysis: "Tam Adım Adım Analiz",
    methodicalApproach: "Metodolojik Yaklaşım:",
    importantInsights: "Önemli Bulgular:",
    highestMarketShare: "En Yüksek Pazar Payı:",
    calculateIncreaseRates: "Artış oranlarını hesapla:",
    percentageChanges: "Ardışık dönemler arasındaki yüzdelik değişimler",
    meaningLargestGrowth: "Bu, Sirius AG'nin pazar payındaki en büyük göreli büyüme artışını gösterir.",
    strongestIncrease: "En Güçlü Artış:",
    trendAnalysis: "Trend Analizi:",
    continuousGrowth: "Gözlem dönemi boyunca pazar payının sürekli büyümesi gözlenebilir",
    businessRelevance: "İş Önemi:",
    positiveMarketDevelopment: "Pozitif pazar gelişimi stratejik iş kararlarını destekler",
    taskDescription: "Görev Açıklaması",
    ratingLegend: "Değerlendirme Açıklaması",
    customer: "Müşteri",
    function: "İşlev",
    performance: "Performans",
    eco: "Ekolojik",
    price: "Fiyat",
    average: "Ortalama",
    summary: "Özet",
    surveyResults: "Müşteri Anketi Sonuçları:",
    goodAndBetterShort: "İyi ve daha iyi",
    satisfactoryAndWorseShort: "Yeterli ve daha kötü",
    ecoAverage: "Ekolojik Ortalama",
    showsDynamicDevelopment: "büyüme - en dinamik gelişimi gösterir",
    with: "ile",
    gradeVeryGood: "çok iyi",
    gradeGood: "iyi",
    gradeSatisfactory: "orta",
    gradeAdequate: "yeterli",
    gradeDeficient: "yetersiz",
    gradeInsufficient: "başarısız",
    gradeUnknown: "Bilinmeyen",
    gradeLabelVeryGood: "Çok İyi",
    gradeLabelGood: "İyi",
    gradeLabelSatisfactory: "Orta",
    gradeLabelAdequate: "Yeterli",
    gradeLabelDeficient: "Yetersiz", 
    gradeLabelInsufficient: "Başarısız",
    percentageIncreaseFormula: "Yüzdelik artış = (yeni değer - eski değer) / eski değer × 100",
    absoluteIncrease: "Mutlak artış:",
    percentagePoints: "yüzde puanı",
    dataCollection: "Veri toplama:",
    collectRevenueData: "Sektör ve Sirius AG için 6 yarıyıl boyunca gelir verilerinin toplanması",
    calculateMarketShare: "Pazar payını hesapla:",
    applyFormula: "Formülün uygulanması: (Sirius AG / Sektör) × 100 her yarıyıl için",
    identifyMaximum: "Maksimumu belirle:",
    compareAllShares: "En yüksek değeri belirlemek için tüm pazar paylarının karşılaştırılması",
    basicFormulaText: "Pazar payı = (Şirket geliri / Toplam sektör geliri) × 100",
    percentageCalculation: "Yüzde hesaplama",
    trendCalculation: "Trend hesaplama",
    // Table and calculation terms
    siriusRevenue: "Sirius AG Geliri",
    industryRevenue: "Sektör Geliri",
    marketShareTerm: "Pazar Payı",
    dataType: "Veri Türü",
    // Step by step explanations
    collectBaseData: "Temel verileri topla",
    calculateIncrease: "Artışı hesapla",
    percentageIncreaseFormula2: "Yüzdelik artış = (Yeni pazar payı - Eski pazar payı) / Eski pazar payı × 100",
    marketShareFormulaSpecific: "Pazar Payı = (Sirius AG Geliri / Sektör Geliri) × 100",
    stepByStepExplanation: "Adım Adım Açıklama:",
    step1: "Temel verileri topla:",
    step1Description: "Her yarıyıl için sektör geliri ve Sirius AG geliri",
    step2: "Dönem başına pazar payını hesapla:",
    step2Description: "(Sirius AG / Sektör) × 100",
    step3: "Yüzdelik artışı belirle:",
    step3Description: "Önceki dönemle karşılaştırma",
    step4: "Sonuçları yorumla:",
    step4Description: "Trendleri ve gelişmeleri tanımla"
  },
  ro: {
    title: "Exerciții de Analiză de Afaceri",
    availableExercises: "Exerciții Disponibile",
    exercise1Title: "Analiza Cotei de Piață Sirius AG",
    exercise1Desc: "Calculul cotei de piață și analiza tendințelor pentru o companie germană pe mai multe semestre.",
    exercise2Title: "Evaluarea Sondajului Clienților",
    exercise2Desc: "Evaluarea ratingurilor clienților folosind sistemul de notare școlar cu analiză statistică.",
    startExercise: "Începe Exercițiul",
    backToMenu: "Înapoi la Meniu",
    showTask: "Arată Sarcina",
    hideTask: "Ascunde Sarcina",
    showData: "Arată Datele",
    hideData: "Ascunde Datele",
    showTable: "Arată Tabelul",
    showSolution: "Arată Soluția",
    selectExercise: "Selectează un exercițiu pentru a începe",
    theme: "Temă",
    language: "Limbă",
    light: "Luminos",
    dark: "Întunecat",
    system: "Sistem",
    // Sirius Exercise
    taskStatement: "Declarația Sarcinii",
    siriusTask: "Lucrați la Sirius AG și trebuie să efectuați o analiză a cotei de piață pentru ultimii trei ani.",
    dataAvailable: "Următoarele date de vânzări vă sunt disponibile:",
    period: "Semestru",
    industry: "Industrie (€ Milioane)",
    sirius: "Sirius AG (€ Milioane)",
    taskA: "În care semestru a avut Sirius AG cea mai mare cotă de piață?",
    taskB: "În care semestru a avut Sirius AG cea mai mare creștere procentuală a cotei de piață?",
    taskLabelA: "Sarcina a)",
    taskLabelB: "Sarcina b)",
    marketData: "Date de Piață",
    calculatedShares: "Cote de Piață Calculate",
    calculationBasis: "Baza de Calcul",
    basicFormula: "Formula de Bază:",
    exampleCalc: "Exemplu de calcul pentru 1. Sem. 01:",
    marketShareFormula: "Cota de Piață = (Venitul Companiei / Venitul Total al Industriei) × 100",
    solutionA: "Soluția a)",
    solutionB: "Soluția b)",
    solutionATitle: "Soluția a) Cea Mai Mare Cotă de Piață",
    solutionBTitle: "Soluția b) Cea Mai Mare Creștere Procentuală",
    // Customer Exercise
    customerSurvey: "Sondaj Clienți",
    surveyDescription: "S-a efectuat un sondaj pentru îmbunătățirea satisfacției clienților. Trebuie să evaluați răspunsurile celor mai importanți zece clienți conform criteriilor următoare.",
    gradeSystem: "Evaluarea folosind notele școlare (1 = foarte bine, 6 = insuficient).",
    tasks: "Sarcini:",
    taskCustomerA: "Ce procent a evaluat bine sau mai bine în media celor patru evaluări individuale?",
    taskCustomerB: "Ce procent a evaluat satisfăcător sau mai rău în media celor patru evaluări individuale?",
    taskCustomerC: "Ce notă medie a fost acordată pentru luarea în considerare a aspectelor ecologice în produse?",
    solutionALabel: "Soluția a) Bine și mai bine",
    solutionBLabel: "Soluția b) Satisfăcător și mai rău",
    solutionCLabel: "Soluția c) Aspecte ecologice",
    goodAndBetter: "bine și mai bine",
    satisfactoryAndWorse: "satisfăcător și mai rău",
    ecologicalAspects: "Aspecte Ecologice",
    customersWithAverage: "Clienți cu nota medie",
    numberOfCustomers: "Numărul de clienți cu",
    haveRated: "au",
    rated: "evaluat",
    averageGrade: "Nota medie",
    ecoAverageGrade: "Nota medie eco",
    analysis: "Evaluare",
    overallAnalysisTitle: "📊 Analiza generală a sondajului clienților",
    majorityOfCustomers: "Majoritatea clienților",
    ratedGoodOrBetter: "a evaluat compania bine sau mai bine",
    onlyPercentage: "Doar",
    gaveSatisfactoryOrWorse: "dintre clienți au dat evaluări satisfăcătoare sau mai rele",
    ecoAspectsRated: "Aspectele ecologice au fost evaluate cu",
    correspondTo: "evaluat - acest lucru corespunde cu",
    recommendation: "Recomandare:",
    improveEcoAspects: "Îmbunătățirea aspectelor ecologice ar putea spori satisfacția generală",
    ecoAspectsAlreadyGood: "Aspectele ecologice sunt deja bine evaluate",
    interpretation: "Interpretare:",
    calculation: "Calcul:",
    calculationExplanation: "Explicația calculului:",
    totalCustomers: "Numărul total de clienți:",
    sumOfRatings: "Suma evaluărilor eco:",
    allCustomersEcoRatings: "Evaluările eco ale tuturor clienților:",
    result: "Rezultat:",
    noCustomers: "Niciun client",
    firstHalf: "1. Sem.",
    secondHalf: "2. Sem.",
    hadHighestMarketShare: "a avut cea mai mare cotă de piață cu",
    formula: "Formula:",
    example: "Exemplu pentru",
    meaning: "Semnificație:",
    strongestMarketPosition: "Aceasta arată cea mai puternică poziție de piață a Sirius AG în întreaga perioadă de observare.",
    showsStrongestPosition: "arată cea mai puternică poziție de piață",
    largestPercentageIncrease: "Cea mai mare creștere procentuală a avut loc de la",
    withIncrease: "cu o creștere de",
    notAvailable: "Nu este disponibil.",
    to: "la",
    exercise1: "Exercițiul 1",
    exercise2: "Exercițiul 2",
    marketAnalysis: "Analiza pieței",
    percentageCalculation: "Calculul procentelor",
    trendCalculation: "Calculul tendințelor",
    customerSatisfaction: "Satisfacția clienților",
    statistics: "Statistici",
    averageValues: "Valori medii",
    industryRevenueMio: "Industrie (€ milioane)",
    siriusRevenueMio: "Sirius AG (€ milioane)",
    marketSharePercent: "Cota de piață (%)",
    increasePercent: "Creștere (%)",
    stepByStepAnalysis: "Analiza completă pas cu pas",
    methodicalApproach: "Abordare metodică:",
    importantInsights: "Perspective importante:",
    highestMarketShare: "Cea mai mare cotă de piață:",
    calculateIncreaseRates: "Calculează ratele de creștere:",
    percentageChanges: "Modificări procentuale între perioadele consecutive",
    meaningLargestGrowth: "Aceasta arată cel mai mare salt relativ de creștere al Sirius AG în cota de piață.",
    strongestIncrease: "Cea mai puternică creștere:",
    trendAnalysis: "Analiza tendințelor:",
    continuousGrowth: "Creștere continuă a cotei de piață observabilă pe perioada de observare",
    businessRelevance: "Relevanța comercială:",
    positiveMarketDevelopment: "Dezvoltarea pozitivă a pieței susține deciziile comerciale strategice",
    taskDescription: "Descrierea sarcinii",
    ratingLegend: "Legenda evaluărilor",
    customer: "Client",
    function: "Funcție",
    performance: "Performanță",
    eco: "Eco",
    price: "Preț",
    average: "Medie",
    summary: "Rezumat",
    surveyResults: "Rezultatele sondajului clienților:",
    goodAndBetterShort: "Bine și mai bine",
    satisfactoryAndWorseShort: "Satisfăcător și mai rău",
    ecoAverage: "Media eco",
    showsDynamicDevelopment: "Creștere - arată cea mai dinamică dezvoltare",
    with: "cu",
    gradeVeryGood: "foarte bine",
    gradeGood: "bine",
    gradeSatisfactory: "satisfăcător",
    gradeAdequate: "suficient",
    gradeDeficient: "deficient",
    gradeInsufficient: "insuficient",
    gradeUnknown: "Necunoscut",
    gradeLabelVeryGood: "Foarte bine",
    gradeLabelGood: "Bine",
    gradeLabelSatisfactory: "Satisfăcător",
    gradeLabelAdequate: "Suficient",
    gradeLabelDeficient: "Deficient",
    gradeLabelInsufficient: "Insuficient",
    percentageIncreaseFormula: "Creșterea procentuală = (valoarea nouă - valoarea veche) / valoarea veche × 100",
    absoluteIncrease: "Creștere absolută:",
    percentagePoints: "puncte procentuale",
    dataCollection: "Colectarea datelor:",
    collectRevenueData: "Colectarea datelor de venituri pentru industrie și Sirius AG pe 6 semestre",
    calculateMarketShare: "Calculează cota de piață:",
    applyFormula: "Aplicarea formulei: (Sirius AG / Industrie) × 100 pentru fiecare semestru",
    identifyMaximum: "Identifică maximul:",
    compareAllShares: "Compararea tuturor cotelor de piață pentru determinarea valorii maxime",
    basicFormulaText: "Cota de piață = (Venitul companiei / Venitul total al industriei) × 100",
    siriusRevenue: "Venitul Sirius AG",
    industryRevenue: "Venitul industriei",
    marketShareTerm: "Cota de piață",
    dataType: "Tipul de date",
    collectBaseData: "Colectează datele de bază",
    calculateIncrease: "Calculează creșterea",
    percentageIncreaseFormula2: "Creșterea procentuală = (Cota de piață nouă - Cota de piață veche) / Cota de piață veche × 100",
    marketShareFormulaSpecific: "Cota de piață = (Venitul Sirius AG / Venitul industriei) × 100",
    stepByStepExplanation: "Explicația pas cu pas:",
    step1: "Colectează datele de bază:",
    step1Description: "Venitul industriei și venitul Sirius AG pentru fiecare semestru",
    step2: "Calculează cota de piață pe perioadă:",
    step2Description: "(Sirius AG / Industrie) × 100",
    step3: "Determină creșterea procentuală:",
    step3Description: "Comparație cu perioada anterioară",
    step4: "Interpretează rezultatele:",
    step4Description: "Identifică tendințele și dezvoltările",
    solutionAHide: "Ascunde soluția a)",
    solutionBHide: "Ascunde soluția b)",
    showCompleteAnalysis: "Arată analiza completă",
    hideCompleteAnalysis: "Ascunde analiza completă",
    showTableCustomer: "Arată tabelul",
    showSolutionCustomer: "Arată soluția",
    showOverallAnalysis: "📊 Arată analiza generală"
  },
  sy: {
    title: "تمارين تحليل الأعمال",
    availableExercises: "التمارين المتاحة",
    exercise1Title: "تحليل حصة السوق لشركة سيريوس",
    exercise1Desc: "حساب حصة السوق وتحليل الاتجاهات لشركة ألمانية على مدى عدة أنصاف سنوات.",
    exercise2Title: "تقييم استطلاع العملاء",
    exercise2Desc: "تقييم تقييمات العملاء باستخدام نظام الدرجات المدرسية مع التحليل الإحصائي.",
    startExercise: "بدء التمرين",
    backToMenu: "العودة للقائمة",
    showTask: "إظهار المهمة",
    hideTask: "إخفاء المهمة",
    showData: "إظهار البيانات",
    hideData: "إخفاء البيانات",
    showTable: "إظهار الجدول",
    showSolution: "إظهار الحل",
    selectExercise: "اختر تمريناً للبدء",
    theme: "السمة",
    language: "اللغة",
    light: "فاتح",
    dark: "داكن",
    system: "النظام",
    // Sirius Exercise
    taskStatement: "بيان المهمة",
    siriusTask: "أنت تعمل في شركة سيريوس وعليك إجراء تحليل حصة السوق للسنوات الثلاث الماضية.",
    dataAvailable: "البيانات التالية للمبيعات متاحة لك:",
    period: "نصف السنة",
    industry: "الصناعة (€ مليون)",
    sirius: "سيريوس (€ مليون)",
    taskA: "في أي نصف سنة كانت لدى سيريوس أعلى حصة في السوق؟",
    taskB: "في أي نصف سنة كانت لدى سيريوس أعلى زيادة مئوية في حصة السوق؟",
    taskLabelA: "المهمة أ)",
    taskLabelB: "المهمة ب)",
    marketData: "بيانات السوق",
    calculatedShares: "حصص السوق المحسوبة",
    calculationBasis: "أساس الحساب",
    basicFormula: "الصيغة الأساسية:",
    exampleCalc: "مثال حساب للنصف الأول 01:",
    marketShareFormula: "حصة السوق = (إيرادات الشركة / إجمالي إيرادات الصناعة) × 100",
    solutionA: "إظهار الحل أ)",
    solutionB: "إظهار الحل ب)",
    solutionAHide: "إخفاء الحل أ)",
    solutionBHide: "إخفاء الحل ب)",
    solutionATitle: "الحل أ) أعلى حصة في السوق",
    solutionBTitle: "الحل ب) أعلى زيادة مئوية",
    showCalculatedShares: "إظهار حصص السوق المحسوبة",
    hideCalculatedShares: "إخفاء حصص السوق المحسوبة",
    showCompleteAnalysis: "إظهار التحليل الكامل",
    hideCompleteAnalysis: "إخفاء التحليل الكامل",
    showTableCustomer: "إظهار الجدول",
    showSolutionCustomer: "إظهار الحل",
    showOverallAnalysis: "📊 إظهار التحليل العام",
    // Customer Exercise
    customerSurvey: "استطلاع العملاء",
    surveyDescription: "تم إجراء استطلاع لتحسين رضا العملاء. يجب تقييم إجابات أهم عشرة عملاء وفقاً للمعايير التالية.",
    gradeSystem: "التقييم باستخدام الدرجات المدرسية (1 = ممتاز، 6 = غير كافٍ).",
    tasks: "المهام:",
    taskCustomerA: "ما النسبة المئوية التي قيّمت جيد أو أفضل في متوسط التقييمات الأربعة الفردية؟",
    taskCustomerB: "ما النسبة المئوية التي قيّمت مرضٍ أو أسوأ في متوسط التقييمات الأربعة الفردية؟",
    taskCustomerC: "ما الدرجة المتوسطة التي تم منحها لمراعاة الجوانب البيئية في المنتجات؟",
    // Solution labels
    solutionALabel: "الحل أ) جيد وأفضل",
    solutionBLabel: "الحل ب) مرضٍ وأسوأ",
    solutionCLabel: "الحل ج) الجوانب البيئية",
    // Rating categories
    goodAndBetter: "جيد وأفضل",
    satisfactoryAndWorse: "مرضٍ وأسوأ",
    ecologicalAspects: "الجوانب البيئية",
    // Analysis terms
    customersWithAverage: "العملاء بمتوسط درجة",
    numberOfCustomers: "عدد العملاء مع",
    haveRated: "قيّموا",
    rated: "قيّم",
    averageGrade: "الدرجة المتوسطة",
    ecoAverageGrade: "الدرجة المتوسطة البيئية",
    analysis: "التحليل",
    // Overall analysis
    overallAnalysisTitle: "📊 التحليل العام لاستطلاع العملاء",
    majorityOfCustomers: "غالبية العملاء",
    ratedGoodOrBetter: "قيّموا الشركة جيد أو أفضل",
    onlyPercentage: "فقط",
    gaveSatisfactoryOrWorse: "من العملاء أعطوا تقييمات مرضية أو أسوأ",
    ecoAspectsRated: "تم تقييم الجوانب البيئية بـ",
    correspondTo: "مُقيّمة - وهذا يقابل",
    recommendation: "التوصية:",
    improveEcoAspects: "تحسين الجوانب البيئية يمكن أن يزيد الرضا العام",
    ecoAspectsAlreadyGood: "الجوانب البيئية مُقيّمة جيداً بالفعل",
    interpretation: "التفسير:",
    calculation: "الحساب:",
    calculationExplanation: "شرح الحساب:",
    totalCustomers: "إجمالي العملاء:",
    sumOfRatings: "مجموع التقييمات البيئية:",
    allCustomersEcoRatings: "التقييمات البيئية لجميع العملاء:",
    result: "النتيجة:",
    noCustomers: "لا يوجد عملاء",
    // Period translations
    firstHalf: "النصف الأول",
    secondHalf: "النصف الثاني",
    // Solution answer texts
    hadHighestMarketShare: "حقق أعلى حصة سوق بنسبة",
    formula: "الصيغة:",
    example: "مثال لـ",
    meaning: "المعنى:",
    strongestMarketPosition: "يُظهر هذا أقوى موقع سوقي لشركة سيريوس في فترة المراجعة بأكملها.",
    showsStrongestPosition: "يُظهر أقوى موقع سوقي",
    largestPercentageIncrease: "أكبر زيادة مئوية حدثت من",
    withIncrease: "بزيادة قدرها",
    notAvailable: "غير متاح.",
    to: "إلى",
    exercise1: "التمرين 1",
    exercise2: "التمرين 2",
    marketAnalysis: "تحليل السوق",
    customerSatisfaction: "رضا العملاء",
    statistics: "الإحصائيات",
    averageValues: "القيم المتوسطة",
    industryRevenueMio: "الصناعة (€ مليون)",
    siriusRevenueMio: "سيريوس (€ مليون)",
    marketSharePercent: "حصة السوق (%)",
    increasePercent: "الزيادة (%)",
    stepByStepAnalysis: "التحليل الكامل خطوة بخطوة",
    methodicalApproach: "النهج المنهجي:",
    importantInsights: "الرؤى المهمة:",
    highestMarketShare: "أعلى حصة سوق:",
    calculateIncreaseRates: "حساب معدلات الزيادة:",
    percentageChanges: "التغييرات المئوية بين الفترات المتتالية",
    meaningLargestGrowth: "يُظهر هذا أكبر دفعة نمو نسبية لشركة سيريوس في حصة السوق.",
    strongestIncrease: "أقوى زيادة:",
    trendAnalysis: "تحليل الاتجاه:",
    continuousGrowth: "نمو مستمر في حصة السوق يمكن ملاحظته خلال فترة المراجعة",
    businessRelevance: "الصلة بالأعمال:",
    positiveMarketDevelopment: "التطوير الإيجابي للسوق يدعم القرارات التجارية الاستراتيجية",
    taskDescription: "وصف المهمة",
    ratingLegend: "مفتاح التقييم",
    customer: "العميل",
    function: "الوظيفة",
    performance: "الأداء",
    eco: "بيئي",
    price: "السعر",
    average: "المتوسط",
    summary: "الملخص",
    surveyResults: "نتائج استطلاع العملاء:",
    goodAndBetterShort: "جيد وأفضل",
    satisfactoryAndWorseShort: "مرضٍ وأسوأ",
    ecoAverage: "المتوسط البيئي",
    showsDynamicDevelopment: "النمو - يُظهر التطوير الأكثر ديناميكية",
    with: "مع",
    gradeVeryGood: "ممتاز جداً",
    gradeGood: "جيد",
    gradeSatisfactory: "مرضٍ",
    gradeAdequate: "كافٍ",
    gradeDeficient: "ناقص",
    gradeInsufficient: "غير كافٍ",
    gradeUnknown: "غير معروف",
    gradeLabelVeryGood: "ممتاز جداً",
    gradeLabelGood: "جيد",
    gradeLabelSatisfactory: "مرضٍ",
    gradeLabelAdequate: "كافٍ",
    gradeLabelDeficient: "ناقص",
    gradeLabelInsufficient: "غير كافٍ",
    percentageIncreaseFormula: "الزيادة المئوية = (القيمة الجديدة - القيمة القديمة) / القيمة القديمة × 100",
    absoluteIncrease: "الزيادة المطلقة:",
    percentagePoints: "نقاط مئوية",
    dataCollection: "جمع البيانات:",
    collectRevenueData: "جمع بيانات الإيرادات للصناعة وسيريوس على مدى 6 أنصاف سنوات",
    calculateMarketShare: "حساب حصة السوق:",
    applyFormula: "تطبيق الصيغة: (سيريوس / الصناعة) × 100 لكل نصف سنة",
    identifyMaximum: "تحديد الحد الأقصى:",
    compareAllShares: "مقارنة جميع حصص السوق لتحديد أعلى قيمة",
    basicFormulaText: "حصة السوق = (إيرادات الشركة / إجمالي إيرادات الصناعة) × 100",
    percentageCalculation: "الحساب المئوي",
    trendCalculation: "حساب الاتجاه",
    // Table and calculation terms
    siriusRevenue: "إيرادات سيريوس",
    industryRevenue: "إيرادات الصناعة",
    marketShareTerm: "حصة السوق",
    dataType: "نوع البيانات",
    // Step by step explanations
    collectBaseData: "جمع البيانات الأساسية",
    calculateIncrease: "حساب الزيادة",
    percentageIncreaseFormula2: "الزيادة المئوية = (حصة السوق الجديدة - حصة السوق القديمة) / حصة السوق القديمة × 100",
    marketShareFormulaSpecific: "حصة السوق = (إيرادات سيريوس / إيرادات الصناعة) × 100",
    stepByStepExplanation: "الشرح خطوة بخطوة:",
    step1: "جمع البيانات الأساسية:",
    step1Description: "إيرادات الصناعة وإيرادات سيريوس لكل نصف سنة",
    step2: "حساب حصة السوق لكل فترة:",
    step2Description: "(سيريوس / الصناعة) × 100",
    step3: "تحديد الزيادة المئوية:",
    step3Description: "المقارنة مع الفترة السابقة",
    step4: "تفسير النتائج:",
    step4Description: "تحديد الاتجاهات والتطورات"
  },
  ar: {
    title: "تمارين تحليل الأعمال",
    availableExercises: "التمارين المتاحة",
    exercise1Title: "تحليل حصة السوق لشركة سيريوس",
    exercise1Desc: "حساب حصة السوق وتحليل الاتجاهات لشركة ألمانية على مدى عدة أنصاف سنوات.",
    exercise2Title: "تقييم استطلاع العملاء",
    exercise2Desc: "تقييم تقييمات العملاء باستخدام نظام الدرجات المدرسية مع التحليل الإحصائي.",
    startExercise: "بدء التمرين",
    backToMenu: "العودة للقائمة",
    showTask: "إظهار المهمة",
    hideTask: "إخفاء المهمة",
    showData: "إظهار البيانات",
    hideData: "إخفاء البيانات",
    showTable: "إظهار الجدول",
    showSolution: "إظهار الحل",
    selectExercise: "اختر تمريناً للبدء",
    theme: "السمة",
    language: "اللغة",
    light: "فاتح",
    dark: "داكن",
    system: "النظام",
    // Sirius Exercise
    taskStatement: "بيان المهمة",
    siriusTask: "أنت تعمل في شركة سيريوس وعليك إجراء تحليل حصة السوق للسنوات الثلاث الماضية.",
    dataAvailable: "البيانات التالية للمبيعات متاحة لك:",
    period: "نصف السنة",
    industry: "الصناعة (€ مليون)",
    sirius: "سيريوس (€ مليون)",
    taskA: "في أي نصف سنة كانت لدى سيريوس أعلى حصة في السوق؟",
    taskB: "في أي نصف سنة كانت لدى سيريوس أعلى زيادة مئوية في حصة السوق؟",
    taskLabelA: "المهمة أ)",
    taskLabelB: "المهمة ب)",
    marketData: "بيانات السوق",
    calculatedShares: "حصص السوق المحسوبة",
    calculationBasis: "أساس الحساب",
    basicFormula: "الصيغة الأساسية:",
    exampleCalc: "مثال حساب للنصف الأول 01:",
    marketShareFormula: "حصة السوق = (إيرادات الشركة / إجمالي إيرادات الصناعة) × 100",
    solutionA: "إظهار الحل أ)",
    solutionB: "إظهار الحل ب)",
    solutionAHide: "إخفاء الحل أ)",
    solutionBHide: "إخفاء الحل ب)",
    solutionATitle: "الحل أ) أعلى حصة في السوق",
    solutionBTitle: "الحل ب) أعلى زيادة مئوية",
    showCalculatedShares: "إظهار حصص السوق المحسوبة",
    hideCalculatedShares: "إخفاء حصص السوق المحسوبة",
    showCompleteAnalysis: "إظهار التحليل الكامل",
    hideCompleteAnalysis: "إخفاء التحليل الكامل",
    showTableCustomer: "إظهار الجدول",
    showSolutionCustomer: "إظهار الحل",
    showOverallAnalysis: "📊 إظهار التحليل العام",
    // Customer Exercise
    customerSurvey: "استطلاع العملاء",
    surveyDescription: "تم إجراء استطلاع لتحسين رضا العملاء. يجب تقييم إجابات أهم عشرة عملاء وفقاً للمعايير التالية.",
    gradeSystem: "التقييم باستخدام الدرجات المدرسية (1 = ممتاز، 6 = غير كافٍ).",
    tasks: "المهام:",
    taskCustomerA: "ما النسبة المئوية التي قيّمت جيد أو أفضل في متوسط التقييمات الأربعة الفردية؟",
    taskCustomerB: "ما النسبة المئوية التي قيّمت مرضٍ أو أسوأ في متوسط التقييمات الأربعة الفردية؟",
    taskCustomerC: "ما الدرجة المتوسطة التي تم منحها لمراعاة الجوانب البيئية في المنتجات؟",
    // Solution labels
    solutionALabel: "الحل أ) جيد وأفضل",
    solutionBLabel: "الحل ب) مرضٍ وأسوأ",
    solutionCLabel: "الحل ج) الجوانب البيئية",
    // Rating categories
    goodAndBetter: "جيد وأفضل",
    satisfactoryAndWorse: "مرضٍ وأسوأ",
    ecologicalAspects: "الجوانب البيئية",
    // Analysis terms
    customersWithAverage: "العملاء بمتوسط درجة",
    numberOfCustomers: "عدد العملاء مع",
    haveRated: "قيّموا",
    rated: "قيّم",
    averageGrade: "الدرجة المتوسطة",
    ecoAverageGrade: "الدرجة المتوسطة البيئية",
    analysis: "التحليل",
    // Overall analysis
    overallAnalysisTitle: "📊 التحليل العام لاستطلاع العملاء",
    majorityOfCustomers: "غالبية العملاء",
    ratedGoodOrBetter: "قيّموا الشركة جيد أو أفضل",
    onlyPercentage: "فقط",
    gaveSatisfactoryOrWorse: "من العملاء أعطوا تقييمات مرضية أو أسوأ",
    ecoAspectsRated: "تم تقييم الجوانب البيئية بـ",
    correspondTo: "مُقيّمة - وهذا يقابل",
    recommendation: "التوصية:",
    improveEcoAspects: "تحسين الجوانب البيئية يمكن أن يزيد الرضا العام",
    ecoAspectsAlreadyGood: "الجوانب البيئية مُقيّمة جيداً بالفعل",
    interpretation: "التفسير:",
    calculation: "الحساب:",
    calculationExplanation: "شرح الحساب:",
    totalCustomers: "إجمالي العملاء:",
    sumOfRatings: "مجموع التقييمات البيئية:",
    allCustomersEcoRatings: "التقييمات البيئية لجميع العملاء:",
    result: "النتيجة:",
    noCustomers: "لا يوجد عملاء",
    // Period translations
    firstHalf: "النصف الأول",
    secondHalf: "النصف الثاني",
    // Solution answer texts
    hadHighestMarketShare: "حقق أعلى حصة سوق بنسبة",
    formula: "الصيغة:",
    example: "مثال لـ",
    meaning: "المعنى:",
    strongestMarketPosition: "يُظهر هذا أقوى موقع سوقي لشركة سيريوس في فترة المراجعة بأكملها.",
    showsStrongestPosition: "يُظهر أقوى موقع سوقي",
    largestPercentageIncrease: "أكبر زيادة مئوية حدثت من",
    withIncrease: "بزيادة قدرها",
    notAvailable: "غير متاح.",
    to: "إلى",
    exercise1: "التمرين 1",
    exercise2: "التمرين 2",
    marketAnalysis: "تحليل السوق",
    customerSatisfaction: "رضا العملاء",
    statistics: "الإحصائيات",
    averageValues: "القيم المتوسطة",
    industryRevenueMio: "الصناعة (€ مليون)",
    siriusRevenueMio: "سيريوس (€ مليون)",
    marketSharePercent: "حصة السوق (%)",
    increasePercent: "الزيادة (%)",
    stepByStepAnalysis: "التحليل الكامل خطوة بخطوة",
    methodicalApproach: "النهج المنهجي:",
    importantInsights: "الرؤى المهمة:",
    highestMarketShare: "أعلى حصة سوق:",
    calculateIncreaseRates: "حساب معدلات الزيادة:",
    percentageChanges: "التغييرات المئوية بين الفترات المتتالية",
    meaningLargestGrowth: "يُظهر هذا أكبر دفعة نمو نسبية لشركة سيريوس في حصة السوق.",
    strongestIncrease: "أقوى زيادة:",
    trendAnalysis: "تحليل الاتجاه:",
    continuousGrowth: "نمو مستمر في حصة السوق يمكن ملاحظته خلال فترة المراجعة",
    businessRelevance: "الصلة بالأعمال:",
    positiveMarketDevelopment: "التطوير الإيجابي للسوق يدعم القرارات التجارية الاستراتيجية",
    taskDescription: "وصف المهمة",
    ratingLegend: "مفتاح التقييم",
    customer: "العميل",
    function: "الوظيفة",
    performance: "الأداء",
    eco: "بيئي",
    price: "السعر",
    average: "المتوسط",
    summary: "الملخص",
    surveyResults: "نتائج استطلاع العملاء:",
    goodAndBetterShort: "جيد وأفضل",
    satisfactoryAndWorseShort: "مرضٍ وأسوأ",
    ecoAverage: "المتوسط البيئي",
    showsDynamicDevelopment: "النمو - يُظهر التطوير الأكثر ديناميكية",
    with: "مع",
    gradeVeryGood: "ممتاز جداً",
    gradeGood: "جيد",
    gradeSatisfactory: "مرضٍ",
    gradeAdequate: "كافٍ",
    gradeDeficient: "ناقص",
    gradeInsufficient: "غير كافٍ",
    gradeUnknown: "غير معروف",
    gradeLabelVeryGood: "ممتاز جداً",
    gradeLabelGood: "جيد",
    gradeLabelSatisfactory: "مرضٍ",
    gradeLabelAdequate: "كافٍ",
    gradeLabelDeficient: "ناقص",
    gradeLabelInsufficient: "غير كافٍ",
    percentageIncreaseFormula: "الزيادة المئوية = (القيمة الجديدة - القيمة القديمة) / القيمة القديمة × 100",
    absoluteIncrease: "الزيادة المطلقة:",
    percentagePoints: "نقاط مئوية",
    dataCollection: "جمع البيانات:",
    collectRevenueData: "جمع بيانات الإيرادات للصناعة وسيريوس على مدى 6 أنصاف سنوات",
    calculateMarketShare: "حساب حصة السوق:",
    applyFormula: "تطبيق الصيغة: (سيريوس / الصناعة) × 100 لكل نصف سنة",
    identifyMaximum: "تحديد الحد الأقصى:",
    compareAllShares: "مقارنة جميع حصص السوق لتحديد أعلى قيمة",
    basicFormulaText: "حصة السوق = (إيرادات الشركة / إجمالي إيرادات الصناعة) × 100",
    percentageCalculation: "الحساب المئوي",
    trendCalculation: "حساب الاتجاه",
    // Table and calculation terms
    siriusRevenue: "إيرادات سيريوس",
    industryRevenue: "إيرادات الصناعة",
    marketShareTerm: "حصة السوق",
    dataType: "نوع البيانات",
    // Step by step explanations
    collectBaseData: "جمع البيانات الأساسية",
    calculateIncrease: "حساب الزيادة",
    percentageIncreaseFormula2: "الزيادة المئوية = (حصة السوق الجديدة - حصة السوق القديمة) / حصة السوق القديمة × 100",
    marketShareFormulaSpecific: "حصة السوق = (إيرادات سيريوس / إيرادات الصناعة) × 100",
    stepByStepExplanation: "الشرح خطوة بخطوة:",
    step1: "جمع البيانات الأساسية:",
    step1Description: "إيرادات الصناعة وإيرادات سيريوس لكل نصف سنة",
    step2: "حساب حصة السوق لكل فترة:",
    step2Description: "(سيريوس / الصناعة) × 100",
    step3: "تحديد الزيادة المئوية:",
    step3Description: "المقارنة مع الفترة السابقة",
    step4: "تفسير النتائج:",
    step4Description: "تحديد الاتجاهات والتطورات"
  },
  ru: {
    title: "Упражнения по Бизнес-Аналитике",
    availableExercises: "Доступные Упражнения",
    exercise1Title: "Анализ Рыночной Доли Sirius AG",
    exercise1Desc: "Расчет рыночной доли и анализ тенденций для немецкой компании за несколько полугодий.",
    exercise2Title: "Оценка Опроса Клиентов",
    exercise2Desc: "Оценка клиентских рейтингов с использованием школьной системы оценок со статистическим анализом.",
    startExercise: "Начать Упражнение",
    backToMenu: "Вернуться в Меню",
    showTask: "Показать Задачу",
    hideTask: "Скрыть Задачу",
    showData: "Показать Данные",
    hideData: "Скрыть Данные",
    showTable: "Показать Таблицу",
    showSolution: "Показать Решение",
    selectExercise: "Выберите упражнение для начала",
    theme: "Тема",
    language: "Язык",
    light: "Светлая",
    dark: "Темная",
    system: "Системная",
    // Sirius Exercise
    taskStatement: "Постановка Задачи",
    siriusTask: "Вы работаете в Sirius AG и должны провести анализ доли рынка за последние три года.",
    dataAvailable: "Вам доступны следующие данные о продажах:",
    period: "Полугодие",
    industry: "Отрасль (€ млн)",
    sirius: "Sirius AG (€ млн)",
    taskA: "В каком полугодии у Sirius AG была самая высокая доля рынка?",
    taskB: "В каком полугодии у Sirius AG был самый высокий процентный рост доли рынка?",
    taskLabelA: "Задача а)",
    taskLabelB: "Задача б)",
    marketData: "Рыночные Данные",
    calculatedShares: "Рассчитанные Доли Рынка",
    calculationBasis: "Основа Расчета",
    basicFormula: "Основная Формула:",
    exampleCalc: "Пример расчета для 1-го полуг. 01:",
    marketShareFormula: "Доля Рынка = (Доход Компании / Общий Доход Отрасли) × 100",
    solutionA: "Показать решение а)",
    solutionB: "Показать решение б)",
    solutionAHide: "Скрыть решение а)",
    solutionBHide: "Скрыть решение б)",
    solutionATitle: "Решение а) Наивысшая Доля Рынка",
    solutionBTitle: "Решение б) Наивысший Процентный Рост",
    showCalculatedShares: "Показать рассчитанные доли рынка",
    hideCalculatedShares: "Скрыть рассчитанные доли рынка",
    showCompleteAnalysis: "Показать полный анализ",
    hideCompleteAnalysis: "Скрыть полный анализ",
    showTableCustomer: "Показать таблицу",
    showSolutionCustomer: "Показать решение",
    showOverallAnalysis: "📊 Показать общий анализ",
    // Customer Exercise
    customerSurvey: "Опрос Клиентов",
    surveyDescription: "Был проведен опрос для улучшения удовлетворенности клиентов. Вы должны оценить ответы десяти самых важных клиентов по следующим критериям.",
    gradeSystem: "Оценка по школьной системе (1 = отлично, 6 = неудовлетворительно).",
    tasks: "Задачи:",
    taskCustomerA: "Какой процент оценил хорошо или лучше в среднем по четырем индивидуальным оценкам?",
    taskCustomerB: "Какой процент оценил удовлетворительно или хуже в среднем по четырем индивидуальным оценкам?",
    taskCustomerC: "Какая средняя оценка была дана за учет экологических аспектов в продуктах?",
    // Solution labels
    solutionALabel: "Решение а) Хорошо и лучше",
    solutionBLabel: "Решение б) Удовлетворительно и хуже",
    solutionCLabel: "Решение в) Экологические аспекты",
    // Rating categories
    goodAndBetter: "хорошо и лучше",
    satisfactoryAndWorse: "удовлетворительно и хуже",
    ecologicalAspects: "Экологические аспекты",
    // Analysis terms
    customersWithAverage: "Клиенты со средней оценкой",
    numberOfCustomers: "Количество клиентов с",
    haveRated: "оценили",
    rated: "оценил",
    averageGrade: "средняя оценка",
    ecoAverageGrade: "эко средняя оценка",
    analysis: "Анализ",
    // Overall analysis
    overallAnalysisTitle: "📊 Общий анализ опроса клиентов",
    majorityOfCustomers: "Большинство клиентов",
    ratedGoodOrBetter: "оценили компанию хорошо или лучше",
    onlyPercentage: "Только",
    gaveSatisfactoryOrWorse: "клиентов дали удовлетворительные или худшие оценки",
    ecoAspectsRated: "Экологические аспекты были оценены на",
    correspondTo: "оценены - это соответствует",
    recommendation: "Рекомендация:",
    improveEcoAspects: "Улучшение экологических аспектов может повысить общую удовлетворенность",
    ecoAspectsAlreadyGood: "Экологические аспекты уже хорошо оценены",
    interpretation: "Интерпретация:",
    calculation: "Расчет:",
    calculationExplanation: "Объяснение расчета:",
    totalCustomers: "Общее количество клиентов:",
    sumOfRatings: "Сумма эко-оценок:",
    allCustomersEcoRatings: "Эко-оценки всех клиентов:",
    result: "Результат:",
    noCustomers: "Нет клиентов",
    // Period translations
    firstHalf: "1-е полуг.",
    secondHalf: "2-е полуг.",
    // Solution answer texts
    hadHighestMarketShare: "имела самую высокую долю рынка",
    formula: "Формула:",
    example: "Пример для",
    meaning: "Значение:",
    strongestMarketPosition: "Это показывает самую сильную рыночную позицию Sirius AG за весь рассматриваемый период.",
    showsStrongestPosition: "показывает самую сильную рыночную позицию",
    largestPercentageIncrease: "Самый большой процентный рост произошел с",
    withIncrease: "с ростом",
    notAvailable: "Недоступно.",
    to: "до",
    exercise1: "Упражнение 1",
    exercise2: "Упражнение 2",
    marketAnalysis: "Анализ рынка",
    customerSatisfaction: "Удовлетворенность клиентов",
    statistics: "Статистика",
    averageValues: "Средние значения",
    industryRevenueMio: "Отрасль (€ млн)",
    siriusRevenueMio: "Sirius AG (€ млн)",
    marketSharePercent: "Доля рынка (%)",
    increasePercent: "Рост (%)",
    stepByStepAnalysis: "Полный пошаговый анализ",
    methodicalApproach: "Методический подход:",
    importantInsights: "Важные выводы:",
    highestMarketShare: "Самая высокая доля рынка:",
    calculateIncreaseRates: "Рассчитать темпы роста:",
    percentageChanges: "Процентные изменения между последовательными периодами",
    meaningLargestGrowth: "Это показывает наибольший относительный скачок роста доли рынка Sirius AG.",
    strongestIncrease: "Самый сильный рост:",
    trendAnalysis: "Анализ тренда:",
    continuousGrowth: "Непрерывный рост доли рынка наблюдается в течение рассматриваемого периода",
    businessRelevance: "Деловая значимость:",
    positiveMarketDevelopment: "Позитивное развитие рынка поддерживает стратегические бизнес-решения",
    taskDescription: "Описание задачи",
    ratingLegend: "Легенда оценок",
    customer: "Клиент",
    function: "Функция",
    performance: "Производительность",
    eco: "Эко",
    price: "Цена",
    average: "Среднее",
    summary: "Резюме",
    surveyResults: "Результаты опроса клиентов:",
    goodAndBetterShort: "Хорошо и лучше",
    satisfactoryAndWorseShort: "Удовлетворительно и хуже",
    ecoAverage: "Эко среднее",
    showsDynamicDevelopment: "рост - показывает самое динамичное развитие",
    with: "с",
    gradeVeryGood: "отлично",
    gradeGood: "хорошо",
    gradeSatisfactory: "удовлетворительно",
    gradeAdequate: "достаточно",
    gradeDeficient: "неудовлетворительно",
    gradeInsufficient: "плохо",
    gradeUnknown: "Неизвестно",
    gradeLabelVeryGood: "Отлично",
    gradeLabelGood: "Хорошо",
    gradeLabelSatisfactory: "Удовлетворительно",
    gradeLabelAdequate: "Достаточно",
    gradeLabelDeficient: "Неудовлетворительно",
    gradeLabelInsufficient: "Плохо",
    percentageIncreaseFormula: "Процентный рост = (новое значение - старое значение) / старое значение × 100",
    absoluteIncrease: "Абсолютный рост:",
    percentagePoints: "процентных пункта",
    dataCollection: "Сбор данных:",
    collectRevenueData: "Сбор данных о выручке для отрасли и Sirius AG за 6 полугодий",
    calculateMarketShare: "Рассчитать долю рынка:",
    applyFormula: "Применение формулы: (Sirius AG / Отрасль) × 100 для каждого полугодия",
    identifyMaximum: "Определить максимум:",
    compareAllShares: "Сравнение всех долей рынка для определения наивысшего значения",
    basicFormulaText: "Доля рынка = (Выручка компании / Общая выручка отрасли) × 100",
    percentageCalculation: "Процентные расчеты",
    trendCalculation: "Расчет тренда",
    // Table and calculation terms
    siriusRevenue: "Выручка Sirius AG",
    industryRevenue: "Выручка отрасли",
    marketShareTerm: "Доля рынка",
    dataType: "Тип данных",
    // Step by step explanations
    collectBaseData: "Собрать базовые данные",
    calculateIncrease: "Рассчитать рост",
    percentageIncreaseFormula2: "Процентный рост = (Новая доля рынка - Старая доля рынка) / Старая доля рынка × 100",
    marketShareFormulaSpecific: "Доля рынка = (Выручка Sirius AG / Выручка отрасли) × 100",
    stepByStepExplanation: "Пошаговое объяснение:",
    step1: "Собрать базовые данные:",
    step1Description: "Выручка отрасли и выручка Sirius AG для каждого полугодия",
    step2: "Рассчитать долю рынка за период:",
    step2Description: "(Sirius AG / Отрасль) × 100",
    step3: "Определить процентный рост:",
    step3Description: "Сравнение с предыдущим периодом",
    step4: "Интерпретировать результаты:",
    step4Description: "Определить тренды и развитие"
  },
  pl: {
    title: "Ćwiczenia Analizy Biznesowej",
    availableExercises: "Dostępne Ćwiczenia",
    exercise1Title: "Analiza Udziału w Rynku Sirius AG",
    exercise1Desc: "Obliczanie udziału w rynku i analiza trendów dla niemieckiej firmy przez kilka półroczy.",
    exercise2Title: "Ocena Ankiety Klientów",
    exercise2Desc: "Ocena ocen klientów przy użyciu szkolnego systemu oceniania z analizą statystyczną.",
    startExercise: "Rozpocznij Ćwiczenie",
    backToMenu: "Powrót do Menu",
    showTask: "Pokaż Zadanie",
    hideTask: "Ukryj Zadanie",
    showData: "Pokaż Dane",
    hideData: "Ukryj Dane",
    showTable: "Pokaż Tabelę",
    showSolution: "Pokaż Rozwiązanie",
    selectExercise: "Wybierz ćwiczenie, aby rozpocząć",
    theme: "Motyw",
    language: "Język",
    light: "Jasny",
    dark: "Ciemny",
    system: "Systemowy",
    // Sirius Exercise
    taskStatement: "Opis Zadania",
    siriusTask: "Pracujesz w Sirius AG i musisz przeprowadzić analizę udziału w rynku za ostatnie trzy lata.",
    dataAvailable: "Dostępne są następujące dane sprzedażowe:",
    period: "Półrocze",
    industry: "Branża (€ mln)",
    sirius: "Sirius AG (€ mln)",
    taskA: "W którym półroczu Sirius AG miał najwyższy udział w rynku?",
    taskB: "W którym półroczu Sirius AG miał najwyższy procentowy wzrost udziału w rynku?",
    taskLabelA: "Zadanie a)",
    taskLabelB: "Zadanie b)",
    marketData: "Dane Rynkowe",
    calculatedShares: "Obliczone Udziały w Rynku",
    calculationBasis: "Podstawa Obliczeń",
    basicFormula: "Podstawowa Formuła:",
    exampleCalc: "Przykład obliczenia dla 1. półr. 01:",
    marketShareFormula: "Udział w Rynku = (Przychody Firmy / Całkowite Przychody Branży) × 100",
    solutionA: "Pokaż rozwiązanie a)",
    solutionB: "Pokaż rozwiązanie b)",
    solutionAHide: "Ukryj rozwiązanie a)",
    solutionBHide: "Ukryj rozwiązanie b)",
    solutionATitle: "Rozwiązanie a) Najwyższy Udział w Rynku",
    solutionBTitle: "Rozwiązanie b) Najwyższy Wzrost Procentowy",
    showCalculatedShares: "Pokaż obliczone udziały w rynku",
    hideCalculatedShares: "Ukryj obliczone udziały w rynku",
    showCompleteAnalysis: "Pokaż pełną analizę",
    hideCompleteAnalysis: "Ukryj pełną analizę",
    showTableCustomer: "Pokaż tabelę",
    showSolutionCustomer: "Pokaż rozwiązanie",
    showOverallAnalysis: "📊 Pokaż ogólną analizę",
    // Customer Exercise
    customerSurvey: "Ankieta Klientów",
    surveyDescription: "Przeprowadzono ankietę w celu poprawy zadowolenia klientów. Należy ocenić odpowiedzi dziesięciu najważniejszych klientów według następujących kryteriów.",
    gradeSystem: "Ocenianie przy użyciu systemu szkolnego (1 = bardzo dobry, 6 = niedostateczny).",
    tasks: "Zadania:",
    taskCustomerA: "Jaki procent ocenił dobrze lub lepiej średnio z czterech indywidualnych ocen?",
    taskCustomerB: "Jaki procent ocenił dostatecznie lub gorzej średnio z czterech indywidualnych ocen?",
    taskCustomerC: "Jaką średnią ocenę przyznano za uwzględnienie aspektów ekologicznych w produktach?",
    // Solution labels
    solutionALabel: "Rozwiązanie a) Dobrze i lepiej",
    solutionBLabel: "Rozwiązanie b) Dostatecznie i gorzej",
    solutionCLabel: "Rozwiązanie c) Aspekty ekologiczne",
    // Rating categories
    goodAndBetter: "dobrze i lepiej",
    satisfactoryAndWorse: "dostatecznie i gorzej",
    ecologicalAspects: "Aspekty ekologiczne",
    // Analysis terms
    customersWithAverage: "Klienci ze średnią oceną",
    numberOfCustomers: "Liczba klientów z",
    haveRated: "ocenili",
    rated: "ocenił",
    averageGrade: "średnia ocena",
    ecoAverageGrade: "eko średnia ocena",
    analysis: "Analiza",
    // Overall analysis
    overallAnalysisTitle: "📊 Ogólna analiza ankiety klientów",
    majorityOfCustomers: "Większość klientów",
    ratedGoodOrBetter: "oceniła firmę dobrze lub lepiej",
    onlyPercentage: "Tylko",
    gaveSatisfactoryOrWorse: "klientów dało oceny dostateczne lub gorsze",
    ecoAspectsRated: "Aspekty ekologiczne zostały ocenione na",
    correspondTo: "oceniono - odpowiada to",
    recommendation: "Zalecenie:",
    improveEcoAspects: "Poprawa aspektów ekologicznych może zwiększyć ogólne zadowolenie",
    ecoAspectsAlreadyGood: "Aspekty ekologiczne są już dobrze ocenione",
    interpretation: "Interpretacja:",
    calculation: "Obliczenie:",
    calculationExplanation: "Wyjaśnienie obliczeń:",
    totalCustomers: "Łączna liczba klientów:",
    sumOfRatings: "Suma ocen eko:",
    allCustomersEcoRatings: "Oceny eko wszystkich klientów:",
    result: "Wynik:",
    noCustomers: "Brak klientów",
    // Period translations
    firstHalf: "1. półr.",
    secondHalf: "2. półr.",
    // Solution answer texts
    hadHighestMarketShare: "miał najwyższy udział w rynku",
    formula: "Formuła:",
    example: "Przykład dla",
    meaning: "Znaczenie:",
    strongestMarketPosition: "To pokazuje najsilniejszą pozycję rynkową Sirius AG w całym okresie rozważanym.",
    showsStrongestPosition: "pokazuje najsilniejszą pozycję rynkową",
    largestPercentageIncrease: "Największy wzrost procentowy nastąpił z",
    withIncrease: "ze wzrostem",
    notAvailable: "Niedostępne.",
    to: "do",
    exercise1: "Ćwiczenie 1",
    exercise2: "Ćwiczenie 2",
    marketAnalysis: "Analiza rynku",
    customerSatisfaction: "Zadowolenie klientów",
    statistics: "Statystyki",
    averageValues: "Wartości średnie",
    industryRevenueMio: "Branża (€ mln)",
    siriusRevenueMio: "Sirius AG (€ mln)",
    marketSharePercent: "Udział w rynku (%)",
    increasePercent: "Wzrost (%)",
    stepByStepAnalysis: "Pełna analiza krok po kroku",
    methodicalApproach: "Podejście metodyczne:",
    importantInsights: "Ważne spostrzeżenia:",
    highestMarketShare: "Najwyższy udział w rynku:",
    calculateIncreaseRates: "Oblicz tempo wzrostu:",
    percentageChanges: "Zmiany procentowe między kolejnymi okresami",
    meaningLargestGrowth: "To pokazuje największy względny skok wzrostu udziału w rynku Sirius AG.",
    strongestIncrease: "Najsilniejszy wzrost:",
    trendAnalysis: "Analiza trendu:",
    continuousGrowth: "Ciągły wzrost udziału w rynku można zauważyć w okresie rozważanym",
    businessRelevance: "Znaczenie biznesowe:",
    positiveMarketDevelopment: "Pozytywny rozwój rynku wspiera strategiczne decyzje biznesowe",
    taskDescription: "Opis zadania",
    ratingLegend: "Legenda ocen",
    customer: "Klient",
    function: "Funkcja",
    performance: "Wydajność",
    eco: "Eko",
    price: "Cena",
    average: "Średnia",
    summary: "Podsumowanie",
    surveyResults: "Wyniki ankiety klientów:",
    goodAndBetterShort: "Dobrze i lepiej",
    satisfactoryAndWorseShort: "Dostatecznie i gorzej",
    ecoAverage: "Eko średnia",
    showsDynamicDevelopment: "wzrost - pokazuje najbardziej dynamiczny rozwój",
    with: "z",
    gradeVeryGood: "bardzo dobry",
    gradeGood: "dobry",
    gradeSatisfactory: "zadowalający",
    gradeAdequate: "dostateczny",
    gradeDeficient: "niedostateczny",
    gradeInsufficient: "niewystarczający",
    gradeUnknown: "Nieznany",
    gradeLabelVeryGood: "Bardzo dobry",
    gradeLabelGood: "Dobry",
    gradeLabelSatisfactory: "Zadowalający",
    gradeLabelAdequate: "Dostateczny",
    gradeLabelDeficient: "Niedostateczny",
    gradeLabelInsufficient: "Niewystarczający",
    percentageIncreaseFormula: "Wzrost procentowy = (nowa wartość - stara wartość) / stara wartość × 100",
    absoluteIncrease: "Wzrost bezwzględny:",
    percentagePoints: "punkty procentowe",
    dataCollection: "Zbieranie danych:",
    collectRevenueData: "Zbieranie danych o przychodach dla branży i Sirius AG przez 6 półroczy",
    calculateMarketShare: "Oblicz udział w rynku:",
    applyFormula: "Zastosowanie formuły: (Sirius AG / Branża) × 100 dla każdego półrocza",
    identifyMaximum: "Zidentyfikuj maksimum:",
    compareAllShares: "Porównanie wszystkich udziałów w rynku w celu określenia najwyższej wartości",
    basicFormulaText: "Udział w rynku = (Przychody firmy / Całkowite przychody branży) × 100",
    percentageCalculation: "Obliczenia procentowe",
    trendCalculation: "Obliczenie trendu",
    // Table and calculation terms
    siriusRevenue: "Przychody Sirius AG",
    industryRevenue: "Przychody branży",
    marketShareTerm: "Udział w rynku",
    dataType: "Typ danych",
    // Step by step explanations
    collectBaseData: "Zbierz dane podstawowe",
    calculateIncrease: "Oblicz wzrost",
    percentageIncreaseFormula2: "Wzrost procentowy = (Nowy udział w rynku - Stary udział w rynku) / Stary udział w rynku × 100",
    marketShareFormulaSpecific: "Udział w rynku = (Przychody Sirius AG / Przychody branży) × 100",
    stepByStepExplanation: "Wyjaśnienie krok po kroku:",
    step1: "Zbierz dane podstawowe:",
    step1Description: "Przychody branży i przychody Sirius AG dla każdego półrocza",
    step2: "Oblicz udział w rynku na okres:",
    step2Description: "(Sirius AG / Branża) × 100",
    step3: "Określ wzrost procentowy:",
    step3Description: "Porównanie z poprzednim okresem",
    step4: "Interpretuj wyniki:",
    step4Description: "Zidentyfikuj trendy i rozwój"
  },
  at: {
    title: "Business Analytics Übungen",
    availableExercises: "Verfügbare Übungen",
    exercise1Title: "Sirius AG Marktanteil Analyse",
    exercise1Desc: "Marktanteilsberechnung und Trendanalyse für ein österreichisches Unternehmen über mehrere Halbjahre.",
    exercise2Title: "Kundenbefragung Auswertung",
    exercise2Desc: "Auswertung von Kundenbewertungen nach österreichischem Schulnotensystem mit statistischer Analyse.",
    startExercise: "Übung starten",
    backToMenu: "Zurück zum Menü",
    showTask: "Aufgabe anzeigen",
    hideTask: "Aufgabe ausblenden",
    showData: "Daten anzeigen",
    hideData: "Daten ausblenden",
    showTable: "Tabelle anzeigen",
    showSolution: "Lösung anzeigen",
    selectExercise: "Wählen Sie eine Übung aus, um zu beginnen",
    theme: "Design",
    language: "Sprache",
    light: "Hell",
    dark: "Dunkel",
    system: "System",
    // Sirius Exercise
    taskStatement: "Aufgabenstellung",
    siriusTask: "Sie sind bei der Sirius AG beschäftigt und sollen eine Marktanteilsanalyse für die letzten drei Jahre durchführen.",
    dataAvailable: "Ihnen liegen folgende Umsatzdaten vor:",
    period: "Halbjahr",
    industry: "Branche (€ Mio)",
    sirius: "Sirius AG (€ Mio)",
    taskA: "In welchem Halbjahr hatte die Sirius AG den höchsten Marktanteil?",
    taskB: "In welchem Halbjahr hatte die Sirius AG die höchste prozentuale Steigerung des Marktanteils?",
    taskLabelA: "Aufgabe a)",
    taskLabelB: "Aufgabe b)",
    marketData: "Marktdaten",
    calculatedShares: "Berechnete Marktanteile",
    calculationBasis: "Berechnungsgrundlage",
    basicFormula: "Grundformel:",
    exampleCalc: "Beispielberechnung für 1. Halbj. 01:",
    marketShareFormula: "Marktanteil = (Umsatz des Unternehmens / Gesamtumsatz der Branche) × 100",
    solutionA: "Lösung a) anzeigen",
    solutionB: "Lösung b) anzeigen",
    solutionAHide: "Lösung a) ausblenden",
    solutionBHide: "Lösung b) ausblenden",
    solutionATitle: "Lösung a) Höchster Marktanteil",
    solutionBTitle: "Lösung b) Höchste prozentuale Steigerung",
    showCalculatedShares: "Berechnete Marktanteile anzeigen",
    hideCalculatedShares: "Berechnete Marktanteile ausblenden",
    showCompleteAnalysis: "Vollständige Analyse anzeigen",
    hideCompleteAnalysis: "Vollständige Analyse ausblenden",
    showTableCustomer: "Tabelle anzeigen",
    showSolutionCustomer: "Lösung anzeigen",
    showOverallAnalysis: "📊 Gesamtanalyse anzeigen",
    // Customer Exercise
    customerSurvey: "Kundenbefragung",
    surveyDescription: "Zur Verbesserung der Kundenzufriedenheit wurde eine Kundenbefragung durchgeführt. Sie sollen die Antworten der zehn wichtigsten Kunden nach folgenden Kriterien auswerten und ermitteln.",
    gradeSystem: "Bewertung hier in Schulnoten (1 = sehr gut, 6 = ungenügend).",
    tasks: "Aufgaben:",
    taskCustomerA: "Wie viel Prozent haben im Durchschnitt der vier Einzelbewertungen gut und besser bewertet?",
    taskCustomerB: "Wie viel Prozent haben im Durchschnitt der vier Einzelbewertungen ausreichend und schlechter bewertet?",
    taskCustomerC: "Welche Durchschnittsnote für die Berücksichtigung ökologischer Aspekte (Öko) wurde in den Produkten vergeben?",
    // Solution labels
    solutionALabel: "Lösung a) Gut und besser",
    solutionBLabel: "Lösung b) Ausreichend und schlechter",
    solutionCLabel: "Lösung c) Ökologische Aspekte",
    // Rating categories
    goodAndBetter: "gut und besser",
    satisfactoryAndWorse: "ausreichend und schlechter",
    ecologicalAspects: "Ökologische Aspekte",
    // Analysis terms
    customersWithAverage: "Kunden mit Durchschnittsnote",
    numberOfCustomers: "Anzahl Kunden mit",
    haveRated: "haben",
    rated: "bewertet",
    averageGrade: "Durchschnittsnote",
    ecoAverageGrade: "Öko-Durchschnittsnote",
    analysis: "Auswertung",
    // Overall analysis
    overallAnalysisTitle: "📊 Gesamtanalyse der Kundenbefragung",
    majorityOfCustomers: "Die Mehrheit der Kunden",
    ratedGoodOrBetter: "bewertete das Unternehmen gut oder besser",
    onlyPercentage: "Nur",
    gaveSatisfactoryOrWorse: "der Kunden gaben ausreichende oder schlechtere Bewertungen",
    ecoAspectsRated: "Die ökologischen Aspekte wurden mit",
    correspondTo: "bewertet - das entspricht",
    recommendation: "Empfehlung:",
    improveEcoAspects: "Verbesserung der ökologischen Aspekte könnte die Gesamtzufriedenheit steigern",
    ecoAspectsAlreadyGood: "Ökologische Aspekte sind bereits gut bewertet",
    interpretation: "Interpretation:",
    calculation: "Berechnung:",
    calculationExplanation: "Erklärung der Berechnung:",
    totalCustomers: "Gesamtanzahl Kunden:",
    sumOfRatings: "Summe der Öko-Bewertungen:",
    allCustomersEcoRatings: "Öko-Bewertungen aller Kunden:",
    result: "Ergebnis:",
    noCustomers: "Keine Kunden",
    // Period translations
    firstHalf: "1. Halbj.",
    secondHalf: "2. Halbj.",
    // Solution answer texts
    hadHighestMarketShare: "hatte den höchsten Marktanteil mit",
    formula: "Formel:",
    example: "Beispiel für",
    meaning: "Bedeutung:",
    strongestMarketPosition: "Dies zeigt die stärkste Marktposition der Sirius AG im gesamten Betrachtungszeitraum.",
    showsStrongestPosition: "zeigt die stärkste Marktposition",
    largestPercentageIncrease: "Die größte prozentuale Steigerung erfolgte von",
    withIncrease: "mit einer Steigerung von",
    notAvailable: "Nicht verfügbar.",
    to: "zu",
    exercise1: "Übung 1",
    exercise2: "Übung 2",
    marketAnalysis: "Marktanalyse",
    customerSatisfaction: "Kundenzufriedenheit",
    statistics: "Statistik",
    averageValues: "Durchschnittswerte",
    industryRevenueMio: "Branche (€ Mio)",
    siriusRevenueMio: "Sirius AG (€ Mio)",
    marketSharePercent: "Marktanteil (%)",
    increasePercent: "Anstieg (%)",
    stepByStepAnalysis: "Vollständige Schritt-für-Schritt-Analyse",
    methodicalApproach: "Methodisches Vorgehen:",
    importantInsights: "Wichtige Erkenntnisse:",
    highestMarketShare: "Höchster Marktanteil:",
    calculateIncreaseRates: "Steigerungsraten berechnen:",
    percentageChanges: "Prozentuale Veränderungen zwischen aufeinanderfolgenden Perioden",
    meaningLargestGrowth: "Dies zeigt den größten relativen Wachstumsschub der Sirius AG im Marktanteil.",
    strongestIncrease: "Stärkste Steigerung:",
    trendAnalysis: "Trend-Analyse:",
    continuousGrowth: "Kontinuierliches Wachstum des Marktanteils über den Betrachtungszeitraum erkennbar",
    businessRelevance: "Geschäftsrelevanz:",
    positiveMarketDevelopment: "Positive Marktentwicklung unterstützt strategische Geschäftsentscheidungen",
    taskDescription: "Aufgabenstellung",
    ratingLegend: "Bewertungslegende",
    customer: "Kunde",
    function: "Funktion",
    performance: "Leistung",
    eco: "Öko",
    price: "Preis",
    average: "Durchschnitt",
    summary: "Zusammenfassung",
    surveyResults: "Ergebnisse der Kundenbefragung:",
    goodAndBetterShort: "Gut und besser",
    satisfactoryAndWorseShort: "Ausreichend und schlechter",
    ecoAverage: "Öko-Durchschnitt",
    showsDynamicDevelopment: "Wachstum - zeigt dynamischste Entwicklung",
    with: "mit",
    gradeVeryGood: "sehr gut",
    gradeGood: "gut",
    gradeSatisfactory: "befriedigend",
    gradeAdequate: "ausreichend",
    gradeDeficient: "mangelhaft",
    gradeInsufficient: "ungenügend",
    gradeUnknown: "Unbekannt",
    gradeLabelVeryGood: "Sehr gut",
    gradeLabelGood: "Gut",
    gradeLabelSatisfactory: "Befriedigend",
    gradeLabelAdequate: "Ausreichend",
    gradeLabelDeficient: "Mangelhaft",
    gradeLabelInsufficient: "Ungenügend",
    percentageIncreaseFormula: "Prozentuale Steigerung = (neuer Wert - alter Wert) / alter Wert × 100",
    absoluteIncrease: "Absolute Steigerung:",
    percentagePoints: "Prozentpunkte",
    dataCollection: "Datenaufnahme:",
    collectRevenueData: "Sammlung der Umsatzdaten für Branche und Sirius AG über 6 Halbjahre",
    calculateMarketShare: "Marktanteil berechnen:",
    applyFormula: "Anwendung der Formel: (Sirius AG / Branche) × 100 für jedes Halbjahr",
    identifyMaximum: "Maximum identifizieren:",
    compareAllShares: "Vergleich aller Marktanteile zur Bestimmung des höchsten Wertes",
    basicFormulaText: "Marktanteil = (Umsatz des Unternehmens / Gesamtumsatz der Branche) × 100",
    percentageCalculation: "Prozentrechnung",
    trendCalculation: "Trendberechnung",
    // Table and calculation terms
    siriusRevenue: "Sirius AG Umsatz",
    industryRevenue: "Branchenumsatz",
    marketShareTerm: "Marktanteil",
    dataType: "Datentyp",
    // Step by step explanations
    collectBaseData: "Ausgangsdaten sammeln",
    calculateIncrease: "Anstieg berechnen",
    percentageIncreaseFormula2: "Prozentuale Steigerung = (Neuer Marktanteil - Alter Marktanteil) / Alter Marktanteil × 100",
    marketShareFormulaSpecific: "Marktanteil = (Sirius AG Umsatz / Branchenumsatz) × 100",
    stepByStepExplanation: "Schritt-für-Schritt Erklärung:",
    step1: "Ausgangsdaten sammeln:",
    step1Description: "Branchenumsatz und Sirius AG Umsatz für jedes Halbjahr",
    step2: "Marktanteil pro Periode berechnen:",
    step2Description: "(Sirius AG / Branche) × 100",
    step3: "Prozentuale Steigerung ermitteln:",
    step3Description: "Vergleich mit der Vorperiode",
    step4: "Ergebnisse interpretieren:",
    step4Description: "Trends und Entwicklungen identifizieren"
  },
  ch: {
    title: "Business Analytics Übige",
    availableExercises: "Verfügbari Übige",
    exercise1Title: "Sirius AG Marktaateil Analyse",
    exercise1Desc: "Marktaateilsberechnig und Trendanalyse für es schwiizerischs Undernähmä über mehreri Halbjahr.",
    exercise2Title: "Chundebefrägig Uswärtig",
    exercise2Desc: "Uswärtig vo Chundebewärtige nach schwiizerischäm Schuelnootesystem mit statistischä Analyse.",
    startExercise: "Übig startä",
    backToMenu: "Zrugg zum Menü",
    showTask: "Ufgab azäigä",
    hideTask: "Ufgab usblände",
    showData: "Datä azäigä",
    hideData: "Datä usblände",
    showTable: "Tabellä azäigä",
    showSolution: "Lösig azäigä",
    selectExercise: "Wähled Sie en Übig us, um z'biginnä",
    theme: "Design",
    language: "Sprach",
    light: "Hell",
    dark: "Dunkel",
    system: "System",
    // Sirius Exercise
    taskStatement: "Ufgabstellig",
    siriusTask: "Sie sind bi de Sirius AG beschäftiget und sönd en Marktaateilsanalyse för die letzte drü Jahr durefüerä.",
    dataAvailable: "Ihnä ligged folgendi Umsatzdatä vor:",
    period: "Halbjahr",
    industry: "Branchä (€ Mio)",
    sirius: "Sirius AG (€ Mio)",
    taskA: "I welchäm Halbjahr hät d'Sirius AG dä höchscht Marktaateil ghaa?",
    taskB: "I welchäm Halbjahr hät d'Sirius AG di höchschti prozäntuali Steigerig vom Marktaateil ghaa?",
    taskLabelA: "Ufgab a)",
    taskLabelB: "Ufgab b)",
    marketData: "Marktdatä",
    calculatedShares: "Berächneti Marktaateile",
    calculationBasis: "Berächnigsgrundlag",
    basicFormula: "Grundformle:",
    exampleCalc: "Biispielberächnig för 1. Halbj. 01:",
    marketShareFormula: "Marktaateil = (Umsatz vom Undernähmä / Gsamtumsatz vo de Branchä) × 100",
    solutionA: "Lösig a) azäigä",
    solutionB: "Lösig b) azäigä",
    solutionAHide: "Lösig a) usblände",
    solutionBHide: "Lösig b) usblände",
    solutionATitle: "Lösig a) Höchschte Marktaateil",
    solutionBTitle: "Lösig b) Höchschti prozäntuali Steigerig",
    showCalculatedShares: "Berächneti Marktaateile azäigä",
    hideCalculatedShares: "Berächneti Marktaateile usblände",
    showCompleteAnalysis: "Vollständigi Analyse azäigä",
    hideCompleteAnalysis: "Vollständigi Analyse usblände",
    showTableCustomer: "Tabellä azäigä",
    showSolutionCustomer: "Lösig azäigä",
    showOverallAnalysis: "📊 Gsamtanalyse azäigä",
    // Customer Exercise
    customerSurvey: "Chundebefrägig",
    surveyDescription: "Zur Verbessrig vo de Chundezuefridäheit isch en Chundebefrägig duregfüert wordä. Sie sönd d'Antworte vo de zäh wichtigschte Chunde nach folgende Kriterie uswärtä und ermittlä.",
    gradeSystem: "Bewärtig hie i Schuelnootä (1 = sehr guet, 6 = ungnügend).",
    tasks: "Ufgabä:",
    taskCustomerA: "Wie viel Prozänt händ im Durchschnitt vo de vier Einzelbewärtigä guet und besser bewärtät?",
    taskCustomerB: "Wie viel Prozänt händ im Durchschnitt vo de vier Einzelbewärtigä usriichend und schlechter bewärtät?",
    taskCustomerC: "Welchi Durchschnittsnoot för d'Berücksichtigig vo ökologischä Aspekt (Öko) isch i de Produkt vergää wordä?",
    // Solution labels
    solutionALabel: "Lösig a) Guet und besser",
    solutionBLabel: "Lösig b) Usriichend und schlechter",
    solutionCLabel: "Lösig c) Ökologischi Aspekt",
    // Rating categories
    goodAndBetter: "guet und besser",
    satisfactoryAndWorse: "usriichend und schlechter",
    ecologicalAspects: "Ökologischi Aspekt",
    // Analysis terms
    customersWithAverage: "Chunde mit Durchschnittsnoot",
    numberOfCustomers: "Azahl Chunde mit",
    haveRated: "händ",
    rated: "bewärtät",
    averageGrade: "Durchschnittsnoot",
    ecoAverageGrade: "Öko-Durchschnittsnoot",
    analysis: "Uswärtig",
    // Overall analysis
    overallAnalysisTitle: "📊 Gsamtanalyse vo de Chundebefrägig",
    majorityOfCustomers: "Di Mehrheit vo de Chunde",
    ratedGoodOrBetter: "hät s'Undernähmä guet oder besser bewärtät",
    onlyPercentage: "Nur",
    gaveSatisfactoryOrWorse: "vo de Chunde händ usriichendi oder schlechteri Bewärtigä gää",
    ecoAspectsRated: "Di ökologischä Aspekt sind mit",
    correspondTo: "bewärtät wordä - das entspricht",
    recommendation: "Empfählig:",
    improveEcoAspects: "Verbessrig vo de ökologischä Aspekt chönt di gsamti Zuefridäheit steigerä",
    ecoAspectsAlreadyGood: "Ökologischi Aspekt sind scho guet bewärtät",
    interpretation: "Interpretatión:",
    calculation: "Berächnig:",
    calculationExplanation: "Erklärig vo de Berächnig:",
    totalCustomers: "Gsamtazahl Chunde:",
    sumOfRatings: "Summä vo de Öko-Bewärtigä:",
    allCustomersEcoRatings: "Öko-Bewärtigä vo allnä Chunde:",
    result: "Ergebnis:",
    noCustomers: "Kei Chunde",
    // Period translations
    firstHalf: "1. Halbj.",
    secondHalf: "2. Halbj.",
    // Solution answer texts
    hadHighestMarketShare: "hät dä höchscht Marktaateil ghaa mit",
    formula: "Formle:",
    example: "Biispiel för",
    meaning: "Bedütig:",
    strongestMarketPosition: "Das zeigt di stärchschti Marktposition vo de Sirius AG im ganze Betrachtingsziitruum.",
    showsStrongestPosition: "zeigt di stärchschti Marktposition",
    largestPercentageIncrease: "Di grössti prozäntuali Steigerig isch vo",
    withIncrease: "mit ere Steigerig vo",
    notAvailable: "Nöd verfügbar.",
    to: "zu",
    exercise1: "Übig 1",
    exercise2: "Übig 2",
    marketAnalysis: "Marktanalyse",
    customerSatisfaction: "Chundezuefridäheit",
    statistics: "Statistik",
    averageValues: "Durchschnittswärt",
    industryRevenueMio: "Branchä (€ Mio)",
    siriusRevenueMio: "Sirius AG (€ Mio)",
    marketSharePercent: "Marktaateil (%)",
    increasePercent: "Astiig (%)",
    stepByStepAnalysis: "Vollständigi Schritt-för-Schritt-Analyse",
    methodicalApproach: "Methodischs Vorgah:",
    importantInsights: "Wichtigi Erkenntniss:",
    highestMarketShare: "Höchschte Marktaateil:",
    calculateIncreaseRates: "Steigerigs-Rate berächnä:",
    percentageChanges: "Prozäntuali Veränderigä zwüschä ufeinanderfolgendä Periode",
    meaningLargestGrowth: "Das zeigt dä grössti relativi Wachstumsschwung vo de Sirius AG im Marktaateil.",
    strongestIncrease: "Stärchschti Steigerig:",
    trendAnalysis: "Trend-Analyse:",
    continuousGrowth: "Kontinuierlichs Wachstum vom Marktaateil über dä Betrachtingsziitruum erkennbar",
    businessRelevance: "Gschäftsrelevanz:",
    positiveMarketDevelopment: "Positivi Marktentwicklig unterstützt strategischi Gschäftsentscheidigä",
    taskDescription: "Ufgabstellig",
    ratingLegend: "Bewärtigs-Legände",
    customer: "Chund",
    function: "Funktion",
    performance: "Leistig",
    eco: "Öko",
    price: "Priis",
    average: "Durchschnitt",
    summary: "Zämmefassig",
    surveyResults: "Ergebnis vo de Chundebefrägig:",
    goodAndBetterShort: "Guet und besser",
    satisfactoryAndWorseShort: "Usriichend und schlechter",
    ecoAverage: "Öko-Durchschnitt",
    showsDynamicDevelopment: "Wachstum - zeigt dynamischsti Entwicklig",
    with: "mit",
    gradeVeryGood: "sehr guet",
    gradeGood: "guet",
    gradeSatisfactory: "befriedigend",
    gradeAdequate: "usriichend",
    gradeDeficient: "mangelhaft",
    gradeInsufficient: "ungnügend",
    gradeUnknown: "Unbekannt",
    gradeLabelVeryGood: "Sehr guet",
    gradeLabelGood: "Guet",
    gradeLabelSatisfactory: "Befriedigend",
    gradeLabelAdequate: "Usriichend",
    gradeLabelDeficient: "Mangelhaft",
    gradeLabelInsufficient: "Ungnügend",
    percentageIncreaseFormula: "Prozäntuali Steigerig = (neue Wärt - alte Wärt) / alte Wärt × 100",
    absoluteIncrease: "Absoluti Steigerig:",
    percentagePoints: "Prozäntpunkt",
    dataCollection: "Datäufnahm:",
    collectRevenueData: "Sammlig vo de Umsatzdatä för Branchä und Sirius AG über 6 Halbjahr",
    calculateMarketShare: "Marktaateil berächnä:",
    applyFormula: "Awendig vo de Formle: (Sirius AG / Branchä) × 100 för jedes Halbjahr",
    identifyMaximum: "Maximum identifizierä:",
    compareAllShares: "Vergliich vo allnä Marktaateile zur Bestimmig vom höchschte Wärt",
    basicFormulaText: "Marktaateil = (Umsatz vom Undernähmä / Gsamtumsatz vo de Branchä) × 100",
    percentageCalculation: "Prozäntrechniг",
    trendCalculation: "Trendberächnig",
    // Table and calculation terms
    siriusRevenue: "Sirius AG Umsatz",
    industryRevenue: "Brancheumsatz",
    marketShareTerm: "Marktaateil",
    dataType: "Datätyp",
    // Step by step explanations
    collectBaseData: "Usgangsdatä sammlä",
    calculateIncrease: "Astiig berächnä",
    percentageIncreaseFormula2: "Prozäntuali Steigerig = (Neue Marktaateil - Alte Marktaateil) / Alte Marktaateil × 100",
    marketShareFormulaSpecific: "Marktaateil = (Sirius AG Umsatz / Brancheumsatz) × 100",
    stepByStepExplanation: "Schritt-för-Schritt Erklärig:",
    step1: "Usgangsdatä sammlä:",
    step1Description: "Brancheumsatz und Sirius AG Umsatz för jedes Halbjahr",
    step2: "Marktaateil pro Period berächnä:",
    step2Description: "(Sirius AG / Branchä) × 100",
    step3: "Prozäntuali Steigerig ermittlä:",
    step3Description: "Vergliich mit de Vorperiod",
    step4: "Ergebnis interpretierä:",
    step4Description: "Trends und Entwickligä identifizierä"
  },
  nl: {
    title: "Business Analytics Oefeningen",
    availableExercises: "Beschikbare Oefeningen",
    exercise1Title: "Sirius AG Marktaandeel Analyse",
    exercise1Desc: "Marktaandeel berekening en trendanalyse voor een Duits bedrijf over meerdere halfjaren.",
    exercise2Title: "Klantenonderzoek Evaluatie",
    exercise2Desc: "Evaluatie van klantbeoordelingen met schoolcijfersysteem met statistische analyse.",
    startExercise: "Oefening Starten",
    backToMenu: "Terug naar Menu",
    showTask: "Taak Tonen",
    hideTask: "Taak Verbergen",
    showData: "Gegevens Tonen",
    hideData: "Gegevens Verbergen",
    showTable: "Tabel Tonen",
    showSolution: "Oplossing Tonen",
    selectExercise: "Selecteer een oefening om te beginnen",
    theme: "Thema",
    language: "Taal",
    light: "Licht",
    dark: "Donker",
    system: "Systeem",
    // Sirius Exercise
    taskStatement: "Taakstelling",
    siriusTask: "U werkt bij Sirius AG en moet een marktaandeel analyse uitvoeren voor de afgelopen drie jaar.",
    dataAvailable: "De volgende omzetgegevens zijn beschikbaar:",
    period: "Halfjaar",
    industry: "Branche (€ miljoen)",
    sirius: "Sirius AG (€ miljoen)",
    taskA: "In welk halfjaar had Sirius AG het hoogste marktaandeel?",
    taskB: "In welk halfjaar had Sirius AG de hoogste procentuele toename van marktaandeel?",
    taskLabelA: "Taak a)",
    taskLabelB: "Taak b)",
    marketData: "Marktgegevens",
    calculatedShares: "Berekende Marktaandelen",
    calculationBasis: "Berekeningsbasis",
    basicFormula: "Basisformule:",
    exampleCalc: "Voorbeeldberekening voor 1e halfjaar 01:",
    marketShareFormula: "Marktaandeel = (Bedrijfsomzet / Totale branche-omzet) × 100",
    solutionA: "Oplossing a) tonen",
    solutionB: "Oplossing b) tonen",
    solutionAHide: "Oplossing a) verbergen",
    solutionBHide: "Oplossing b) verbergen",
    solutionATitle: "Oplossing a) Hoogste Marktaandeel",
    solutionBTitle: "Oplossing b) Hoogste Procentuele Toename",
    showCalculatedShares: "Berekende marktaandelen tonen",
    hideCalculatedShares: "Berekende marktaandelen verbergen",
    showCompleteAnalysis: "Volledige analyse tonen",
    hideCompleteAnalysis: "Volledige analyse verbergen",
    showTableCustomer: "Tabel tonen",
    showSolutionCustomer: "Oplossing tonen",
    showOverallAnalysis: "📊 Algemene analyse tonen",
    // Customer Exercise
    customerSurvey: "Klantenonderzoek",
    surveyDescription: "Er is een klantenonderzoek uitgevoerd om de klanttevredenheid te verbeteren. U moet de antwoorden van de tien belangrijkste klanten evalueren volgens de volgende criteria.",
    gradeSystem: "Beoordeling met schoolcijfers (1 = zeer goed, 6 = onvoldoende).",
    tasks: "Taken:",
    taskCustomerA: "Welk percentage beoordeelde gemiddeld over de vier individuele beoordelingen goed of beter?",
    taskCustomerB: "Welk percentage beoordeelde gemiddeld over de vier individuele beoordelingen voldoende of slechter?",
    taskCustomerC: "Welk gemiddelde cijfer werd gegeven voor de aandacht voor ecologische aspecten in de producten?",
    // Solution labels
    solutionALabel: "Oplossing a) Goed en beter",
    solutionBLabel: "Oplossing b) Voldoende en slechter",
    solutionCLabel: "Oplossing c) Ecologische aspecten",
    // Rating categories
    goodAndBetter: "goed en beter",
    satisfactoryAndWorse: "voldoende en slechter",
    ecologicalAspects: "Ecologische aspecten",
    // Analysis terms
    customersWithAverage: "Klanten met gemiddeld cijfer",
    numberOfCustomers: "Aantal klanten met",
    haveRated: "hebben",
    rated: "beoordeeld",
    averageGrade: "gemiddeld cijfer",
    ecoAverageGrade: "eco gemiddeld cijfer",
    analysis: "Analyse",
    // Overall analysis
    overallAnalysisTitle: "📊 Algemene analyse van klantenonderzoek",
    majorityOfCustomers: "De meerderheid van klanten",
    ratedGoodOrBetter: "beoordeelde het bedrijf goed of beter",
    onlyPercentage: "Slechts",
    gaveSatisfactoryOrWorse: "van de klanten gaven voldoende of slechtere beoordelingen",
    ecoAspectsRated: "De ecologische aspecten werden beoordeeld met",
    correspondTo: "beoordeeld - dit komt overeen met",
    recommendation: "Aanbeveling:",
    improveEcoAspects: "Verbetering van ecologische aspecten kan de algemene tevredenheid verhogen",
    ecoAspectsAlreadyGood: "Ecologische aspecten zijn al goed beoordeeld",
    interpretation: "Interpretatie:",
    calculation: "Berekening:",
    calculationExplanation: "Uitleg van berekening:",
    totalCustomers: "Totaal aantal klanten:",
    sumOfRatings: "Som van eco-beoordelingen:",
    allCustomersEcoRatings: "Eco-beoordelingen van alle klanten:",
    result: "Resultaat:",
    noCustomers: "Geen klanten",
    // Period translations
    firstHalf: "1e helft",
    secondHalf: "2e helft",
    // Solution answer texts
    hadHighestMarketShare: "had het hoogste marktaandeel met",
    formula: "Formule:",
    example: "Voorbeeld voor",
    meaning: "Betekenis:",
    strongestMarketPosition: "Dit toont de sterkste marktpositie van Sirius AG in de gehele beschouwde periode.",
    showsStrongestPosition: "toont de sterkste marktpositie",
    largestPercentageIncrease: "De grootste procentuele toename vond plaats van",
    withIncrease: "met een toename van",
    notAvailable: "Niet beschikbaar.",
    to: "naar",
    exercise1: "Oefening 1",
    exercise2: "Oefening 2",
    marketAnalysis: "Marktanalyse",
    customerSatisfaction: "Klanttevredenheid",
    statistics: "Statistieken",
    averageValues: "Gemiddelde waarden",
    industryRevenueMio: "Branche (€ miljoen)",
    siriusRevenueMio: "Sirius AG (€ miljoen)",
    marketSharePercent: "Marktaandeel (%)",
    increasePercent: "Toename (%)",
    stepByStepAnalysis: "Volledige stap-voor-stap analyse",
    methodicalApproach: "Methodische aanpak:",
    importantInsights: "Belangrijke inzichten:",
    highestMarketShare: "Hoogste marktaandeel:",
    calculateIncreaseRates: "Bereken groeipercentages:",
    percentageChanges: "Procentuele veranderingen tussen opeenvolgende perioden",
    meaningLargestGrowth: "Dit toont de grootste relatieve groeisprong van Sirius AG in marktaandeel.",
    strongestIncrease: "Sterkste toename:",
    trendAnalysis: "Trendanalyse:",
    continuousGrowth: "Continue groei van marktaandeel waarneembaar over de beschouwde periode",
    businessRelevance: "Zakelijke relevantie:",
    positiveMarketDevelopment: "Positieve marktontwikkeling ondersteunt strategische zakelijke beslissingen",
    taskDescription: "Taakbeschrijving",
    ratingLegend: "Beoordelings-legende",
    customer: "Klant",
    function: "Functie",
    performance: "Prestatie",
    eco: "Eco",
    price: "Prijs",
    average: "Gemiddeld",
    summary: "Samenvatting",
    surveyResults: "Resultaten klantenonderzoek:",
    goodAndBetterShort: "Goed en beter",
    satisfactoryAndWorseShort: "Voldoende en slechter",
    ecoAverage: "Eco gemiddeld",
    showsDynamicDevelopment: "groei - toont meest dynamische ontwikkeling",
    with: "met",
    gradeVeryGood: "zeer goed",
    gradeGood: "goed",
    gradeSatisfactory: "bevredigend",
    gradeAdequate: "voldoende",
    gradeDeficient: "onvoldoende",
    gradeInsufficient: "slecht",
    gradeUnknown: "Onbekend",
    gradeLabelVeryGood: "Zeer goed",
    gradeLabelGood: "Goed",
    gradeLabelSatisfactory: "Bevredigend",
    gradeLabelAdequate: "Voldoende",
    gradeLabelDeficient: "Onvoldoende",
    gradeLabelInsufficient: "Slecht",
    percentageIncreaseFormula: "Procentuele toename = (nieuwe waarde - oude waarde) / oude waarde × 100",
    absoluteIncrease: "Absolute toename:",
    percentagePoints: "procentpunten",
    dataCollection: "Gegevensverzameling:",
    collectRevenueData: "Verzameling van omzetgegevens voor branche en Sirius AG over 6 halfjaren",
    calculateMarketShare: "Bereken marktaandeel:",
    applyFormula: "Toepassing van formule: (Sirius AG / Branche) × 100 voor elk halfjaar",
    identifyMaximum: "Identificeer maximum:",
    compareAllShares: "Vergelijking van alle marktaandelen om hoogste waarde te bepalen",
    basicFormulaText: "Marktaandeel = (Bedrijfsomzet / Totale branche-omzet) × 100",
    percentageCalculation: "Procentberekening",
    trendCalculation: "Trendberekening",
    // Table and calculation terms
    siriusRevenue: "Sirius AG Omzet",
    industryRevenue: "Branche-omzet",
    marketShareTerm: "Marktaandeel",
    dataType: "Gegevenstype",
    // Step by step explanations
    collectBaseData: "Verzamel basisgegevens",
    calculateIncrease: "Bereken toename",
    percentageIncreaseFormula2: "Procentuele toename = (Nieuw marktaandeel - Oud marktaandeel) / Oud marktaandeel × 100",
    marketShareFormulaSpecific: "Marktaandeel = (Sirius AG Omzet / Branche-omzet) × 100",
    stepByStepExplanation: "Stap-voor-stap uitleg:",
    step1: "Verzamel basisgegevens:",
    step1Description: "Branche-omzet en Sirius AG omzet voor elk halfjaar",
    step2: "Bereken marktaandeel per periode:",
    step2Description: "(Sirius AG / Branche) × 100",
    step3: "Bepaal procentuele toename:",
    step3Description: "Vergelijking met vorige periode",
    step4: "Interpreteer resultaten:",
    step4Description: "Identificeer trends en ontwikkelingen"
  },
  cz: {
    title: "Cvičení Obchodní Analýzy",
    availableExercises: "Dostupná Cvičení",
    exercise1Title: "Analýza Tržního Podílu Sirius AG",
    exercise1Desc: "Výpočet tržního podílu a analýza trendů pro německou společnost přes několik pololetí.",
    exercise2Title: "Hodnocení Průzkumu Zákazníků",
    exercise2Desc: "Hodnocení zákaznických hodnocení pomocí školního systému známkování se statistickou analýzou.",
    startExercise: "Začít Cvičení",
    backToMenu: "Zpět do Menu",
    showTask: "Zobrazit Úkol",
    hideTask: "Skrýt Úkol",
    showData: "Zobrazit Data",
    hideData: "Skrýt Data",
    showTable: "Zobrazit Tabulku",
    showSolution: "Zobrazit Řešení",
    selectExercise: "Vyberte cvičení pro začátek",
    theme: "Téma",
    language: "Jazyk",
    light: "Světlý",
    dark: "Tmavý",
    system: "Systémový",
    // Sirius Exercise
    taskStatement: "Zadání Úkolu",
    siriusTask: "Pracujete ve společnosti Sirius AG a musíte provést analýzu tržního podílu za poslední tři roky.",
    dataAvailable: "K dispozici jsou následující prodejní data:",
    period: "Pololetí",
    industry: "Odvětví (€ mil)",
    sirius: "Sirius AG (€ mil)",
    taskA: "Ve kterém pololetí měla Sirius AG nejvyšší tržní podíl?",
    taskB: "Ve kterém pololetí měla Sirius AG nejvyšší procentní nárůst tržního podílu?",
    taskLabelA: "Úkol a)",
    taskLabelB: "Úkol b)",
    marketData: "Tržní Data",
    calculatedShares: "Vypočítané Tržní Podíly",
    calculationBasis: "Základ Výpočtu",
    basicFormula: "Základní Vzorec:",
    exampleCalc: "Příklad výpočtu pro 1. pol. 01:",
    marketShareFormula: "Tržní Podíl = (Příjmy Společnosti / Celkové Příjmy Odvětví) × 100",
    solutionA: "Zobrazit řešení a)",
    solutionB: "Zobrazit řešení b)",
    solutionAHide: "Skrýt řešení a)",
    solutionBHide: "Skrýt řešení b)",
    solutionATitle: "Řešení a) Nejvyšší Tržní Podíl",
    solutionBTitle: "Řešení b) Nejvyšší Procentní Nárůst",
    showCalculatedShares: "Zobrazit vypočítané tržní podíly",
    hideCalculatedShares: "Skrýt vypočítané tržní podíly",
    showCompleteAnalysis: "Zobrazit úplnou analýzu",
    hideCompleteAnalysis: "Skrýt úplnou analýzu",
    showTableCustomer: "Zobrazit tabulku",
    showSolutionCustomer: "Zobrazit řešení",
    showOverallAnalysis: "📊 Zobrazit celkovou analýzu",
    // Customer Exercise
    customerSurvey: "Průzkum Zákazníků",
    surveyDescription: "Byl proveden průzkum pro zlepšení spokojenosti zákazníků. Musíte vyhodnotit odpovědi deseti nejdůležitějších zákazníků podle následujících kritérií.",
    gradeSystem: "Hodnocení pomocí školních známek (1 = výborný, 6 = nedostatečný).",
    tasks: "Úkoly:",
    taskCustomerA: "Kolik procent hodnotilo v průměru ze čtyř individuálních hodnocení dobře nebo lépe?",
    taskCustomerB: "Kolik procent hodnotilo v průměru ze čtyř individuálních hodnocení dostatečně nebo hůře?",
    taskCustomerC: "Jakou průměrnou známku bylo uděleno za zohlednění ekologických aspektů v produktech?",
    // Solution labels
    solutionALabel: "Řešení a) Dobře a lépe",
    solutionBLabel: "Řešení b) Dostatečně a hůře",
    solutionCLabel: "Řešení c) Ekologické aspekty",
    // Rating categories
    goodAndBetter: "dobře a lépe",
    satisfactoryAndWorse: "dostatečně a hůře",
    ecologicalAspects: "Ekologické aspekty",
    // Analysis terms
    customersWithAverage: "Zákazníci s průměrnou známkou",
    numberOfCustomers: "Počet zákazníků s",
    haveRated: "hodnotili",
    rated: "hodnotil",
    averageGrade: "průměrná známka",
    ecoAverageGrade: "eko průměrná známka",
    analysis: "Analýza",
    // Overall analysis
    overallAnalysisTitle: "📊 Celková analýza průzkumu zákazníků",
    majorityOfCustomers: "Většina zákazníků",
    ratedGoodOrBetter: "hodnotila společnost dobře nebo lépe",
    onlyPercentage: "Pouze",
    gaveSatisfactoryOrWorse: "zákazníků dalo dostatečná nebo horší hodnocení",
    ecoAspectsRated: "Ekologické aspekty byly hodnoceny",
    correspondTo: "hodnoceno - to odpovídá",
    recommendation: "Doporučení:",
    improveEcoAspects: "Zlepšení ekologických aspektů by mohlo zvýšit celkovou spokojenost",
    ecoAspectsAlreadyGood: "Ekologické aspekty jsou již dobře hodnoceny",
    interpretation: "Interpretace:",
    calculation: "Výpočet:",
    calculationExplanation: "Vysvětlení výpočtu:",
    totalCustomers: "Celkový počet zákazníků:",
    sumOfRatings: "Součet eko hodnocení:",
    allCustomersEcoRatings: "Eko hodnocení všech zákazníků:",
    result: "Výsledek:",
    noCustomers: "Žádní zákazníci",
    // Period translations
    firstHalf: "1. pol.",
    secondHalf: "2. pol.",
    // Solution answer texts
    hadHighestMarketShare: "měla nejvyšší tržní podíl s",
    formula: "Vzorec:",
    example: "Příklad pro",
    meaning: "Význam:",
    strongestMarketPosition: "To ukazuje nejsilnější tržní pozici Sirius AG v celém sledovaném období.",
    showsStrongestPosition: "ukazuje nejsilnější tržní pozici",
    largestPercentageIncrease: "Největší procentní nárůst nastal z",
    withIncrease: "s nárůstem",
    notAvailable: "Není k dispozici.",
    to: "na",
    exercise1: "Cvičení 1",
    exercise2: "Cvičení 2",
    marketAnalysis: "Tržní analýza",
    customerSatisfaction: "Spokojenost zákazníků",
    statistics: "Statistiky",
    averageValues: "Průměrné hodnoty",
    industryRevenueMio: "Odvětví (€ mil)",
    siriusRevenueMio: "Sirius AG (€ mil)",
    marketSharePercent: "Tržní podíl (%)",
    increasePercent: "Nárůst (%)",
    stepByStepAnalysis: "Úplná krok za krokem analýza",
    methodicalApproach: "Metodický přístup:",
    importantInsights: "Důležité pozorování:",
    highestMarketShare: "Nejvyšší tržní podíl:",
    calculateIncreaseRates: "Vypočítat míry růstu:",
    percentageChanges: "Procentní změny mezi následujícími obdobími",
    meaningLargestGrowth: "To ukazuje největší relativní růstový skok tržního podílu Sirius AG.",
    strongestIncrease: "Nejsilnější nárůst:",
    trendAnalysis: "Analýza trendu:",
    continuousGrowth: "Kontinuální růst tržního podílu je patrný během sledovaného období",
    businessRelevance: "Obchodní relevance:",
    positiveMarketDevelopment: "Pozitivní vývoj trhu podporuje strategická obchodní rozhodnutí",
    taskDescription: "Popis úkolu",
    ratingLegend: "Legenda hodnocení",
    customer: "Zákazník",
    function: "Funkce",
    performance: "Výkon",
    eco: "Eko",
    price: "Cena",
    average: "Průměr",
    summary: "Souhrn",
    surveyResults: "Výsledky průzkumu zákazníků:",
    goodAndBetterShort: "Dobře a lépe",
    satisfactoryAndWorseShort: "Dostatečně a hůře",
    ecoAverage: "Eko průměr",
    showsDynamicDevelopment: "růst - ukazuje nejdynamičtější vývoj",
    with: "s",
    gradeVeryGood: "výborný",
    gradeGood: "dobrý",
    gradeSatisfactory: "uspokojivý",
    gradeAdequate: "dostatečný",
    gradeDeficient: "nedostatečný",
    gradeInsufficient: "neuspokojivý",
    gradeUnknown: "Neznámý",
    gradeLabelVeryGood: "Výborný",
    gradeLabelGood: "Dobrý",
    gradeLabelSatisfactory: "Uspokojivý",
    gradeLabelAdequate: "Dostatečný",
    gradeLabelDeficient: "Nedostatečný",
    gradeLabelInsufficient: "Neuspokojivý",
    percentageIncreaseFormula: "Procentní nárůst = (nová hodnota - stará hodnota) / stará hodnota × 100",
    absoluteIncrease: "Absolutní nárůst:",
    percentagePoints: "procentní body",
    dataCollection: "Sběr dat:",
    collectRevenueData: "Sběr údajů o příjmech pro odvětví a Sirius AG za 6 pololetí",
    calculateMarketShare: "Vypočítat tržní podíl:",
    applyFormula: "Použití vzorce: (Sirius AG / Odvětví) × 100 pro každé pololetí",
    identifyMaximum: "Identifikovat maximum:",
    compareAllShares: "Porovnání všech tržních podílů k určení nejvyšší hodnoty",
    basicFormulaText: "Tržní podíl = (Příjmy společnosti / Celkové příjmy odvětví) × 100",
    percentageCalculation: "Procentní výpočty",
    trendCalculation: "Výpočet trendu",
    // Table and calculation terms
    siriusRevenue: "Příjmy Sirius AG",
    industryRevenue: "Příjmy odvětví",
    marketShareTerm: "Tržní podíl",
    dataType: "Typ dat",
    // Step by step explanations
    collectBaseData: "Shromáždit základní data",
    calculateIncrease: "Vypočítat nárůst",
    percentageIncreaseFormula2: "Procentní nárůst = (Nový tržní podíl - Starý tržní podíl) / Starý tržní podíl × 100",
    marketShareFormulaSpecific: "Tržní podíl = (Příjmy Sirius AG / Příjmy odvětví) × 100",
    stepByStepExplanation: "Krok za krokem vysvětlení:",
    step1: "Shromáždit základní data:",
    step1Description: "Příjmy odvětví a příjmy Sirius AG pro každé pololetí",
    step2: "Vypočítat tržní podíl za období:",
    step2Description: "(Sirius AG / Odvětví) × 100",
    step3: "Určit procentní nárůst:",
    step3Description: "Porovnání s předchozím obdobím",
    step4: "Interpretovat výsledky:",
    step4Description: "Identifikovat trendy a vývoj"
  },
  sk: {
    title: "Cvičenia Obchodnej Analýzy",
    availableExercises: "Dostupné Cvičenia",
    exercise1Title: "Analýza Trhového Podielu Sirius AG",
    exercise1Desc: "Výpočet trhového podielu a analýza trendov pre nemeckú spoločnosť cez niekoľko polrokov.",
    exercise2Title: "Hodnotenie Prieskumu Zákazníkov",
    exercise2Desc: "Hodnotenie zákazníckych hodnotení pomocou školského systému známkovania so štatistickou analýzou.",
    startExercise: "Začať Cvičenie",
    backToMenu: "Späť do Menu",
    showTask: "Zobraziť Úlohu",
    hideTask: "Skryť Úlohu",
    showData: "Zobraziť Dáta",
    hideData: "Skryť Dáta",
    showTable: "Zobraziť Tabuľku",
    showSolution: "Zobraziť Riešenie",
    selectExercise: "Vyberte cvičenie na začiatok",
    theme: "Téma",
    language: "Jazyk",
    light: "Svetlý",
    dark: "Tmavý",
    system: "Systémový",
    // Sirius Exercise
    taskStatement: "Zadanie Úlohy",
    siriusTask: "Pracujete v spoločnosti Sirius AG a musíte vykonať analýzu trhového podielu za posledné tri roky.",
    dataAvailable: "K dispozícii sú nasledujúce predajné dáta:",
    period: "Polrok",
    industry: "Odvetvie (€ mil)",
    sirius: "Sirius AG (€ mil)",
    taskA: "V ktorom polroku mala Sirius AG najvyšší trhový podiel?",
    taskB: "V ktorom polroku mala Sirius AG najvyšší percentuálny nárast trhového podielu?",
    taskLabelA: "Úloha a)",
    taskLabelB: "Úloha b)",
    marketData: "Trhové Dáta",
    calculatedShares: "Vypočítané Trhové Podiely",
    calculationBasis: "Základ Výpočtu",
    basicFormula: "Základný Vzorec:",
    exampleCalc: "Príklad výpočtu pre 1. pol. 01:",
    marketShareFormula: "Trhový Podiel = (Príjmy Spoločnosti / Celkové Príjmy Odvetvia) × 100",
    solutionA: "Zobraziť riešenie a)",
    solutionB: "Zobraziť riešenie b)",
    solutionAHide: "Skryť riešenie a)",
    solutionBHide: "Skryť riešenie b)",
    solutionATitle: "Riešenie a) Najvyšší Trhový Podiel",
    solutionBTitle: "Riešenie b) Najvyšší Percentuálny Nárast",
    showCalculatedShares: "Zobraziť vypočítané trhové podiely",
    hideCalculatedShares: "Skryť vypočítané trhové podiely",
    showCompleteAnalysis: "Zobraziť úplnú analýzu",
    hideCompleteAnalysis: "Skryť úplnú analýzu",
    showTableCustomer: "Zobraziť tabuľku",
    showSolutionCustomer: "Zobraziť riešenie",
    showOverallAnalysis: "📊 Zobraziť celkovú analýzu",
    // Customer Exercise
    customerSurvey: "Prieskum Zákazníkov",
    surveyDescription: "Bol vykonaný prieskum na zlepšenie spokojnosti zákazníkov. Musíte vyhodnotiť odpovede desiatich najdôležitejších zákazníkov podľa nasledujúcich kritérií.",
    gradeSystem: "Hodnotenie pomocou školských známok (1 = výborný, 6 = nedostatočný).",
    tasks: "Úlohy:",
    taskCustomerA: "Koľko percent hodnotilo v priemere zo štyroch individuálnych hodnotení dobre alebo lepšie?",
    taskCustomerB: "Koľko percent hodnotilo v priemere zo štyroch individuálnych hodnotení dostatočne alebo horšie?",
    taskCustomerC: "Akú priemernú známku bolo udelené za zohľadnenie ekologických aspektov v produktoch?",
    // Solution labels
    solutionALabel: "Riešenie a) Dobre a lepšie",
    solutionBLabel: "Riešenie b) Dostatočne a horšie",
    solutionCLabel: "Riešenie c) Ekologické aspekty",
    // Rating categories
    goodAndBetter: "dobre a lepšie",
    satisfactoryAndWorse: "dostatočne a horšie",
    ecologicalAspects: "Ekologické aspekty",
    // Analysis terms
    customersWithAverage: "Zákazníci s priemernou známkou",
    numberOfCustomers: "Počet zákazníkov s",
    haveRated: "hodnotili",
    rated: "hodnotil",
    averageGrade: "priemerná známka",
    ecoAverageGrade: "eko priemerná známka",
    analysis: "Analýza",
    // Overall analysis
    overallAnalysisTitle: "📊 Celková analýza prieskumu zákazníkov",
    majorityOfCustomers: "Väčšina zákazníkov",
    ratedGoodOrBetter: "hodnotila spoločnosť dobre alebo lepšie",
    onlyPercentage: "Len",
    gaveSatisfactoryOrWorse: "zákazníkov dalo dostatočné alebo horšie hodnotenia",
    ecoAspectsRated: "Ekologické aspekty boli hodnotené",
    correspondTo: "hodnotené - to zodpovedá",
    recommendation: "Odporúčanie:",
    improveEcoAspects: "Zlepšenie ekologických aspektov by mohlo zvýšiť celkovú spokojnosť",
    ecoAspectsAlreadyGood: "Ekologické aspekty sú už dobre hodnotené",
    interpretation: "Interpretácia:",
    calculation: "Výpočet:",
    calculationExplanation: "Vysvetlenie výpočtu:",
    totalCustomers: "Celkový počet zákazníkov:",
    sumOfRatings: "Súčet eko hodnotení:",
    allCustomersEcoRatings: "Eko hodnotenia všetkých zákazníkov:",
    result: "Výsledok:",
    noCustomers: "Žiadni zákazníci",
    // Period translations
    firstHalf: "1. pol.",
    secondHalf: "2. pol.",
    // Solution answer texts
    hadHighestMarketShare: "mala najvyšší trhový podiel s",
    formula: "Vzorec:",
    example: "Príklad pre",
    meaning: "Význam:",
    strongestMarketPosition: "To ukazuje najsilnejšiu trhovú pozíciu Sirius AG v celom sledovanom období.",
    showsStrongestPosition: "ukazuje najsilnejšiu trhovú pozíciu",
    largestPercentageIncrease: "Najväčší percentuálny nárast nastal z",
    withIncrease: "s nárastom",
    notAvailable: "Nie je k dispozícii.",
    to: "na",
    exercise1: "Cvičenie 1",
    exercise2: "Cvičenie 2",
    marketAnalysis: "Trhová analýza",
    customerSatisfaction: "Spokojnosť zákazníkov",
    statistics: "Štatistiky",
    averageValues: "Priemerné hodnoty",
    industryRevenueMio: "Odvetvie (€ mil)",
    siriusRevenueMio: "Sirius AG (€ mil)",
    marketSharePercent: "Trhový podiel (%)",
    increasePercent: "Nárast (%)",
    stepByStepAnalysis: "Úplná krok za krokom analýza",
    methodicalApproach: "Metodický prístup:",
    importantInsights: "Dôležité pozorovanie:",
    highestMarketShare: "Najvyšší trhový podiel:",
    calculateIncreaseRates: "Vypočítať miery rastu:",
    percentageChanges: "Percentuálne zmeny medzi nasledujúcimi obdobiami",
    meaningLargestGrowth: "To ukazuje najväčší relatívny rastový skok trhového podielu Sirius AG.",
    strongestIncrease: "Najsilnejší nárast:",
    trendAnalysis: "Analýza trendu:",
    continuousGrowth: "Kontinuálny rast trhového podielu je zrejmý počas sledovaného obdobia",
    businessRelevance: "Obchodná relevancia:",
    positiveMarketDevelopment: "Pozitívny vývoj trhu podporuje strategické obchodné rozhodnutia",
    taskDescription: "Popis úlohy",
    ratingLegend: "Legenda hodnotenia",
    customer: "Zákazník",
    function: "Funkcia",
    performance: "Výkon",
    eco: "Eko",
    price: "Cena",
    average: "Priemer",
    summary: "Súhrn",
    surveyResults: "Výsledky prieskumu zákazníkov:",
    goodAndBetterShort: "Dobre a lepšie",
    satisfactoryAndWorseShort: "Dostatočne a horšie",
    ecoAverage: "Eko priemer",
    showsDynamicDevelopment: "rast - ukazuje najdynamickejší vývoj",
    with: "s",
    gradeVeryGood: "výborný",
    gradeGood: "dobrý",
    gradeSatisfactory: "uspokojivý",
    gradeAdequate: "dostatočný",
    gradeDeficient: "nedostatočný",
    gradeInsufficient: "neuspokojivý",
    gradeUnknown: "Neznámy",
    gradeLabelVeryGood: "Výborný",
    gradeLabelGood: "Dobrý",
    gradeLabelSatisfactory: "Uspokojivý",
    gradeLabelAdequate: "Dostatočný",
    gradeLabelDeficient: "Nedostatočný",
    gradeLabelInsufficient: "Neuspokojivý",
    percentageIncreaseFormula: "Percentuálny nárast = (nová hodnota - stará hodnota) / stará hodnota × 100",
    absoluteIncrease: "Absolútny nárast:",
    percentagePoints: "percentuálne body",
    dataCollection: "Zber dát:",
    collectRevenueData: "Zber údajov o príjmoch pre odvetvie a Sirius AG za 6 polrokov",
    calculateMarketShare: "Vypočítať trhový podiel:",
    applyFormula: "Použitie vzorca: (Sirius AG / Odvetvie) × 100 pre každý polrok",
    identifyMaximum: "Identifikovať maximum:",
    compareAllShares: "Porovnanie všetkých trhových podielov na určenie najvyššej hodnoty",
    basicFormulaText: "Trhový podiel = (Príjmy spoločnosti / Celkové príjmy odvetvia) × 100",
    percentageCalculation: "Percentuálne výpočty",
    trendCalculation: "Výpočet trendu",
    // Table and calculation terms
    siriusRevenue: "Príjmy Sirius AG",
    industryRevenue: "Príjmy odvetvia",
    marketShareTerm: "Trhový podiel",
    dataType: "Typ dát",
    // Step by step explanations
    collectBaseData: "Zhromaždiť základné dáta",
    calculateIncrease: "Vypočítať nárast",
    percentageIncreaseFormula2: "Percentuálny nárast = (Nový trhový podiel - Starý trhový podiel) / Starý trhový podiel × 100",
    marketShareFormulaSpecific: "Trhový podiel = (Príjmy Sirius AG / Príjmy odvetvia) × 100",
    stepByStepExplanation: "Krok za krokom vysvetlenie:",
    step1: "Zhromaždiť základné dáta:",
    step1Description: "Príjmy odvetvia a príjmy Sirius AG pre každý polrok",
    step2: "Vypočítať trhový podiel za obdobie:",
    step2Description: "(Sirius AG / Odvetvie) × 100",
    step3: "Určiť percentuálny nárast:",
    step3Description: "Porovnanie s predchádzajúcim obdobím",
    step4: "Interpretovať výsledky:",
    step4Description: "Identifikovať trendy a vývoj"
  },
  md: {
    title: "Exerciții de Analiză de Afaceri",
    availableExercises: "Exerciții Disponibile",
    exercise1Title: "Analiza Cotei de Piață Sirius AG",
    exercise1Desc: "Calculul cotei de piață și analiza tendințelor pentru o companie germană pe mai multe semestre.",
    exercise2Title: "Evaluarea Sondajului Clienților",
    exercise2Desc: "Evaluarea ratingurilor clienților folosind sistemul de notare școlar cu analiză statistică.",
    startExercise: "Începe Exercițiul",
    backToMenu: "Înapoi la Meniu",
    showTask: "Arată Sarcina",
    hideTask: "Ascunde Sarcina",
    showData: "Arată Datele",
    hideData: "Ascunde Datele",
    showTable: "Arată Tabelul",
    showSolution: "Arată Soluția",
    selectExercise: "Selectează un exercițiu pentru a începe",
    theme: "Temă",
    language: "Limbă",
    light: "Luminos",
    dark: "Întunecat",
    system: "Sistem",
    // Sirius Exercise
    taskStatement: "Declarația Sarcinii",
    siriusTask: "Lucrați la Sirius AG și trebuie să efectuați o analiză a cotei de piață pentru ultimii trei ani.",
    dataAvailable: "Următoarele date de vânzări vă sunt disponibile:",
    period: "Semestru",
    industry: "Industrie (€ mil)",
    sirius: "Sirius AG (€ mil)",
    taskA: "În care semestru a avut Sirius AG cea mai mare cotă de piață?",
    taskB: "În care semestru a avut Sirius AG cea mai mare creștere procentuală a cotei de piață?",
    taskLabelA: "Sarcina a)",
    taskLabelB: "Sarcina b)",
    marketData: "Date de Piață",
    calculatedShares: "Cote de Piață Calculate",
    calculationBasis: "Baza de Calcul",
    basicFormula: "Formula de Bază:",
    exampleCalc: "Exemplu de calcul pentru 1. sem. 01:",
    marketShareFormula: "Cota de Piață = (Venitul Companiei / Venitul Total al Industriei) × 100",
    solutionA: "Arată soluția a)",
    solutionB: "Arată soluția b)",
    solutionAHide: "Ascunde soluția a)",
    solutionBHide: "Ascunde soluția b)",
    solutionATitle: "Soluția a) Cea Mai Mare Cotă de Piață",
    solutionBTitle: "Soluția b) Cea Mai Mare Creștere Procentuală",
    showCalculatedShares: "Arată cotele de piață calculate",
    hideCalculatedShares: "Ascunde cotele de piață calculate",
    showCompleteAnalysis: "Arată analiza completă",
    hideCompleteAnalysis: "Ascunde analiza completă",
    showTableCustomer: "Arată tabelul",
    showSolutionCustomer: "Arată soluția",
    showOverallAnalysis: "📊 Arată analiza generală",
    // Customer Exercise
    customerSurvey: "Sondaj Clienți",
    surveyDescription: "S-a efectuat un sondaj pentru îmbunătățirea satisfacției clienților. Trebuie să evaluați răspunsurile celor mai importanți zece clienți conform criteriilor următoare.",
    gradeSystem: "Evaluarea folosind notele școlare (1 = foarte bine, 6 = insuficient).",
    tasks: "Sarcini:",
    taskCustomerA: "Ce procent a evaluat bine sau mai bine în media celor patru evaluări individuale?",
    taskCustomerB: "Ce procent a evaluat satisfăcător sau mai rău în media celor patru evaluări individuale?",
    taskCustomerC: "Ce notă medie a fost acordată pentru luarea în considerare a aspectelor ecologice în produse?",
    // Solution labels
    solutionALabel: "Soluția a) Bine și mai bine",
    solutionBLabel: "Soluția b) Satisfăcător și mai rău",
    solutionCLabel: "Soluția c) Aspecte ecologice",
    // Rating categories
    goodAndBetter: "bine și mai bine",
    satisfactoryAndWorse: "satisfăcător și mai rău",
    ecologicalAspects: "Aspecte ecologice",
    // Analysis terms
    customersWithAverage: "Clienți cu nota medie",
    numberOfCustomers: "Numărul de clienți cu",
    haveRated: "au evaluat",
    rated: "a evaluat",
    averageGrade: "nota medie",
    ecoAverageGrade: "nota medie eco",
    analysis: "Analiza",
    // Overall analysis
    overallAnalysisTitle: "📊 Analiza generală a sondajului clienților",
    majorityOfCustomers: "Majoritatea clienților",
    ratedGoodOrBetter: "au evaluat compania bine sau mai bine",
    onlyPercentage: "Doar",
    gaveSatisfactoryOrWorse: "clienți au dat evaluări satisfăcătoare sau mai rele",
    ecoAspectsRated: "Aspectele ecologice au fost evaluate",
    correspondTo: "evaluat - aceasta corespunde",
    recommendation: "Recomandare:",
    improveEcoAspects: "Îmbunătățirea aspectelor ecologice ar putea crește satisfacția generală",
    ecoAspectsAlreadyGood: "Aspectele ecologice sunt deja bine evaluate",
    interpretation: "Interpretare:",
    calculation: "Calcul:",
    calculationExplanation: "Explicația calculului:",
    totalCustomers: "Numărul total de clienți:",
    sumOfRatings: "Suma evaluărilor eco:",
    allCustomersEcoRatings: "Evaluările eco ale tuturor clienților:",
    result: "Rezultat:",
    noCustomers: "Niciun client",
    // Period translations
    firstHalf: "1. sem.",
    secondHalf: "2. sem.",
    // Solution answer texts
    hadHighestMarketShare: "a avut cea mai mare cotă de piață cu",
    formula: "Formula:",
    example: "Exemplu pentru",
    meaning: "Semnificație:",
    strongestMarketPosition: "Aceasta arată cea mai puternică poziție de piață a Sirius AG în întreaga perioadă observată.",
    showsStrongestPosition: "arată cea mai puternică poziție de piață",
    largestPercentageIncrease: "Cea mai mare creștere procentuală a avut loc de la",
    withIncrease: "cu o creștere de",
    notAvailable: "Nu este disponibil.",
    to: "la",
    exercise1: "Exercițiul 1",
    exercise2: "Exercițiul 2",
    marketAnalysis: "Analiza pieței",
    customerSatisfaction: "Satisfacția clienților",
    statistics: "Statistici",
    averageValues: "Valori medii",
    industryRevenueMio: "Industrie (€ mil)",
    siriusRevenueMio: "Sirius AG (€ mil)",
    marketSharePercent: "Cota de piață (%)",
    increasePercent: "Creștere (%)",
    stepByStepAnalysis: "Analiza completă pas cu pas",
    methodicalApproach: "Abordare metodică:",
    importantInsights: "Observații importante:",
    highestMarketShare: "Cea mai mare cotă de piață:",
    calculateIncreaseRates: "Calcularea ratelor de creștere:",
    percentageChanges: "Modificări procentuale între perioadele consecutive",
    meaningLargestGrowth: "Aceasta arată cel mai mare salt relativ de creștere a cotei de piață Sirius AG.",
    strongestIncrease: "Cea mai puternică creștere:",
    trendAnalysis: "Analiza tendințelor:",
    continuousGrowth: "Creșterea continuă a cotei de piață este evidentă pe parcursul perioadei observate",
    businessRelevance: "Relevanța comercială:",
    positiveMarketDevelopment: "Dezvoltarea pozitivă a pieței susține deciziile strategice de afaceri",
    taskDescription: "Descrierea sarcinii",
    ratingLegend: "Legenda evaluării",
    customer: "Client",
    function: "Funcție",
    performance: "Performanță",
    eco: "Eco",
    price: "Preț",
    average: "Medie",
    summary: "Rezumat",
    surveyResults: "Rezultatele sondajului clienților:",
    goodAndBetterShort: "Bine și mai bine",
    satisfactoryAndWorseShort: "Satisfăcător și mai rău",
    ecoAverage: "Media eco",
    showsDynamicDevelopment: "creștere - arată cea mai dinamică dezvoltare",
    with: "cu",
    gradeVeryGood: "foarte bine",
    gradeGood: "bine",
    gradeSatisfactory: "satisfăcător",
    gradeAdequate: "suficient",
    gradeDeficient: "deficient",
    gradeInsufficient: "insuficient",
    gradeUnknown: "Necunoscut",
    gradeLabelVeryGood: "Foarte bine",
    gradeLabelGood: "Bine",
    gradeLabelSatisfactory: "Satisfăcător",
    gradeLabelAdequate: "Suficient",
    gradeLabelDeficient: "Deficient",
    gradeLabelInsufficient: "Insuficient",
    percentageIncreaseFormula: "Creștere procentuală = (valoare nouă - valoare veche) / valoare veche × 100",
    absoluteIncrease: "Creștere absolută:",
    percentagePoints: "puncte procentuale",
    dataCollection: "Colectarea datelor:",
    collectRevenueData: "Colectarea datelor de venituri pentru industrie și Sirius AG pentru 6 semestre",
    calculateMarketShare: "Calcularea cotei de piață:",
    applyFormula: "Aplicarea formulei: (Sirius AG / Industrie) × 100 pentru fiecare semestru",
    identifyMaximum: "Identificarea maximului:",
    compareAllShares: "Compararea tuturor cotelor de piață pentru determinarea celei mai mari valori",
    basicFormulaText: "Cota de piață = (Venitul companiei / Venitul total al industriei) × 100",
    percentageCalculation: "Calculul procentelor",
    trendCalculation: "Calculul tendințelor",
    // Table and calculation terms
    siriusRevenue: "Venitul Sirius AG",
    industryRevenue: "Venitul industriei",
    marketShareTerm: "Cota de piață",
    dataType: "Tipul datelor",
    // Step by step explanations
    collectBaseData: "Colectarea datelor de bază",
    calculateIncrease: "Calcularea creșterii",
    percentageIncreaseFormula2: "Creștere procentuală = (Cota de piață nouă - Cota de piață veche) / Cota de piață veche × 100",
    marketShareFormulaSpecific: "Cota de piață = (Venitul Sirius AG / Venitul industriei) × 100",
    stepByStepExplanation: "Explicație pas cu pas:",
    step1: "Colectarea datelor de bază:",
    step1Description: "Veniturile industriei și veniturile Sirius AG pentru fiecare semestru",
    step2: "Calcularea cotei de piață pentru perioadă:",
    step2Description: "(Sirius AG / Industrie) × 100",
    step3: "Determinarea creșterii procentuale:",
    step3Description: "Compararea cu perioada anterioară",
    step4: "Interpretarea rezultatelor:",
    step4Description: "Identificarea tendințelor și dezvoltărilor"
  }
};

// Type-safe translation fallback system - ensures perfect user experience
// If a key is missing in the selected language, it falls back to English translation
const getTranslation = (lang: Language): typeof translations.en => {
  const baseTranslation = translations[lang];
  const englishFallback = translations.en;
  
  // Create a merged object with English fallback for missing keys
  return { ...englishFallback, ...baseTranslation } as typeof translations.en;
};
const languageNames = {
  de: "Deutsch",
  en: "English", 
  tr: "Türkçe",
  ro: "Română",
  sy: "سوري",
  ar: "العربية",
  ru: "Русский",
  pl: "Polski",
  at: "Österreich",
  ch: "Schweiz",
  nl: "Nederlands",
  cz: "Čeština",
  sk: "Slovenčina",
  md: "Moldovenească"
};

const data: DataRow[] = [
  { halbjahr: "1. Halbj. 01", branche: 20.0, sirius: 1.6 },
  { halbjahr: "2. Halbj. 01", branche: 26.8, sirius: 2.5 },
  { halbjahr: "1. Halbj. 02", branche: 21.7, sirius: 2.6 },
  { halbjahr: "2. Halbj. 02", branche: 29.6, sirius: 3.5 },
  { halbjahr: "1. Halbj. 03", branche: 24.4, sirius: 3.6 },
  { halbjahr: "2. Halbj. 03", branche: 32.6, sirius: 4.0 },
];

// Customer Survey Data
interface CustomerSurvey {
  kunde: string;
  funktion: number;
  leistung: number;
  oeko: number;
  preis: number;
  durchschnitt?: number;
}

const customerData: CustomerSurvey[] = [
  { kunde: "A", funktion: 2, leistung: 3, oeko: 4, preis: 2 },
  { kunde: "B", funktion: 2, leistung: 2, oeko: 3, preis: 1 },
  { kunde: "C", funktion: 4, leistung: 4, oeko: 5, preis: 4 },
  { kunde: "D", funktion: 1, leistung: 1, oeko: 4, preis: 2 },
  { kunde: "E", funktion: 2, leistung: 1, oeko: 3, preis: 2 },
  { kunde: "F", funktion: 3, leistung: 2, oeko: 3, preis: 3 },
  { kunde: "G", funktion: 2, leistung: 1, oeko: 5, preis: 3 },
  { kunde: "H", funktion: 2, leistung: 2, oeko: 3, preis: 1 },
  { kunde: "I", funktion: 2, leistung: 2, oeko: 5, preis: 3 },
  { kunde: "J", funktion: 2, leistung: 2, oeko: 4, preis: 2 }
];

function calculateMarketShares(): MarketShareRow[] {
  return data.map((row) => ({
    ...row,
    marketShare: (row.sirius / row.branche) * 100,
  }));
}

function findMaxMarketShare(marketShares: MarketShareRow[]): MarketShareRow {
  return marketShares.reduce(
    (max: MarketShareRow, curr: MarketShareRow) => (curr.marketShare > max.marketShare ? curr : max),
    marketShares[0]
  );
}

type MaxIncrease = {
  from: MarketShareRow | null;
  to: MarketShareRow | null;
  increase: number;
  percentageIncrease: number;
};

function findMaxIncrease(marketShares: MarketShareRow[]): MaxIncrease {
  let maxInc: MaxIncrease = { from: null, to: null, increase: -Infinity, percentageIncrease: -Infinity };
  for (let i = 1; i < marketShares.length; i++) {
    const absoluteInc = marketShares[i].marketShare - marketShares[i - 1].marketShare;
    const percentageInc = (absoluteInc / marketShares[i - 1].marketShare) * 100;
    if (percentageInc > maxInc.percentageIncrease) {
      maxInc = {
        from: marketShares[i - 1],
        to: marketShares[i],
        increase: absoluteInc,
        percentageIncrease: percentageInc,
      };
    }
  }
  return maxInc;
}

// Customer Survey Calculation Functions
function calculateCustomerAverages(): CustomerSurvey[] {
  return customerData.map(customer => ({
    ...customer,
    durchschnitt: (customer.funktion + customer.leistung + customer.oeko + customer.preis) / 4
  }));
}

function calculateGoodOrBetterPercentage(): number {
  const averages = calculateCustomerAverages();
  const goodOrBetter = averages.filter(customer => customer.durchschnitt! <= 2.5); // Note: 1-2 is good, 2.5 is boundary
  return (goodOrBetter.length / averages.length) * 100;
}

function calculateSufficientOrWorsePercentage(): number {
  const averages = calculateCustomerAverages();
  const sufficientOrWorse = averages.filter(customer => customer.durchschnitt! >= 3.5); // Note: 4-6 is sufficient or worse
  return (sufficientOrWorse.length / averages.length) * 100;
}

function calculateEcoAverageGrade(): number {
  const totalEco = customerData.reduce((sum, customer) => sum + customer.oeko, 0);
  return totalEco / customerData.length;
}

function getGradeDescription(grade: number, t: TranslationObject): string {
  if (grade <= 1.5) return t.gradeVeryGood;
  if (grade <= 2.5) return t.gradeGood;
  if (grade <= 3.5) return t.gradeSatisfactory;
  if (grade <= 4.5) return t.gradeAdequate;
  if (grade <= 5.5) return t.gradeDeficient;
  return t.gradeInsufficient;
}

// Helper functions for grade coloring
function getGradeColor(grade: number): string {
  switch (grade) {
    case 1: return 'bg-green-600 text-white border-green-500 shadow-lg shadow-green-500/30'; // Sehr gut
    case 2: return 'bg-green-400 text-white border-green-300 shadow-lg shadow-green-400/30'; // Gut
    case 3: return 'bg-yellow-400 text-black border-yellow-300 shadow-lg shadow-yellow-400/30'; // Befriedigend
    case 4: return 'bg-orange-400 text-white border-orange-300 shadow-lg shadow-orange-400/30'; // Ausreichend
    case 5: return 'bg-red-400 text-white border-red-300 shadow-lg shadow-red-400/30'; // Mangelhaft
    case 6: return 'bg-red-700 text-white border-red-600 shadow-lg shadow-red-700/30'; // Ungenügend
    default: return 'bg-gray-400 text-white border-gray-300 shadow-lg shadow-gray-400/30';
  }
}

function getGradeLabel(grade: number, t: TranslationObject): string {
  switch (grade) {
    case 1: return t.gradeLabelVeryGood;
    case 2: return t.gradeLabelGood;
    case 3: return t.gradeLabelSatisfactory;
    case 4: return t.gradeLabelAdequate;
    case 5: return t.gradeLabelDeficient;
    case 6: return t.gradeLabelInsufficient;
    default: return t.gradeUnknown;
  }
}

function getAverageGradeColor(average: number): string {
  if (average <= 1.5) return 'bg-green-600 text-white border-green-500 shadow-lg shadow-green-500/30'; // Sehr gut
  if (average <= 2.5) return 'bg-green-400 text-white border-green-300 shadow-lg shadow-green-400/30'; // Gut
  if (average <= 3.5) return 'bg-yellow-400 text-black border-yellow-300 shadow-lg shadow-yellow-400/30'; // Befriedigend
  if (average <= 4.5) return 'bg-orange-400 text-white border-orange-300 shadow-lg shadow-orange-400/30'; // Ausreichend
  if (average <= 5.5) return 'bg-red-400 text-white border-red-300 shadow-lg shadow-red-400/30'; // Mangelhaft
  return 'bg-red-700 text-white border-red-600 shadow-lg shadow-red-700/30'; // Ungenügend
}

function useTypingEffect(text: string, speed = 50) {
  const [displayed, setDisplayed] = React.useState("");
  const index = useRef(0);

  useEffect(() => {
    setDisplayed("");
    index.current = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, index.current + 1));
      index.current++;
      if (index.current >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}

// Function to translate period names
function translatePeriod(germanPeriod: string, t: TranslationObject): string {
  if (germanPeriod.includes("1. Halbj.")) {
    return germanPeriod.replace("1. Halbj.", t.firstHalf);
  }
  if (germanPeriod.includes("2. Halbj.")) {
    return germanPeriod.replace("2. Halbj.", t.secondHalf);
  }
  return germanPeriod;
}

export default function SiriusMarketShare() {
  const marketShares = calculateMarketShares();
  const maxShare = findMaxMarketShare(marketShares);
  const maxInc = findMaxIncrease(marketShares);
  
  // State for menu navigation
  const [currentExercise, setCurrentExercise] = React.useState<string | null>(null);
  
  // State for interactive revelation (Exercise 1)
  const [showProblem, setShowProblem] = React.useState(false);
  const [showCalculatedTable, setShowCalculatedTable] = React.useState(false);
  const [showSolutionA, setShowSolutionA] = React.useState(false);
  const [showSolutionB, setShowSolutionB] = React.useState(false);
  const [showCompleteAnalysis, setShowCompleteAnalysis] = React.useState(false);

  // State for interactive revelation (Exercise 2 - Customer Survey)
  const [showCustomerProblem, setShowCustomerProblem] = React.useState(false);
  const [showCustomerTable, setShowCustomerTable] = React.useState(false);
  const [showCustomerSolutionA, setShowCustomerSolutionA] = React.useState(false);
  const [showCustomerSolutionB, setShowCustomerSolutionB] = React.useState(false);
  const [showCustomerSolutionC, setShowCustomerSolutionC] = React.useState(false);
  const [showCustomerAnalysis, setShowCustomerAnalysis] = React.useState(false);

  // Theme and Language State
  const [theme, setTheme] = React.useState<Theme>('dark');
  const [language, setLanguage] = React.useState<Language>('de');
  const [systemTheme, setSystemTheme] = React.useState<'light' | 'dark'>('dark');

  // Check system theme preference
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load saved preferences
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedLanguage = localStorage.getItem('language') as Language;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  // Save preferences
  React.useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('language', language);
  }, [theme, language]);

  // Determine current theme
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  // Get current translations
  const t = getTranslation(language);
  const translatedTitle = useTypingEffect(t.title, 60);

  // Reset function to go back to main menu
  const resetToMenu = () => {
    setCurrentExercise(null);
    // Reset Exercise 1 states
    setShowProblem(false);
    setShowCalculatedTable(false);
    setShowSolutionA(false);
    setShowSolutionB(false);
    setShowCompleteAnalysis(false);
    // Reset Exercise 2 states
    setShowCustomerProblem(false);
    setShowCustomerTable(false);
    setShowCustomerSolutionA(false);
    setShowCustomerSolutionB(false);
    setShowCustomerSolutionC(false);
    setShowCustomerAnalysis(false);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Tektur:wght@400;500;600;700&display=swap');
        * {
          font-family: 'Tektur', monospace !important;
        }
        body {
          font-family: 'Tektur', monospace !important;
        }
      `}</style>
      <div className={`min-h-screen flex flex-col p-3 sm:p-6 transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-black via-gray-900 to-green-900' 
          : 'bg-gradient-to-br from-slate-50 via-gray-100 to-blue-50'
      }`} style={{fontFamily: 'Tektur, monospace'}}>
        
        {/* Header Controls */}
        <div className="fixed top-2 right-2 sm:top-4 sm:right-4 flex gap-1 sm:gap-2 z-50">
          {/* Language Selector */}
          <div className="relative group">
            <button className={`p-1.5 sm:p-2 rounded-lg transition-colors text-sm sm:text-base ${
              isDark 
                ? 'bg-gray-900 hover:bg-gray-800 text-green-400 border border-green-700' 
                : 'bg-white hover:bg-gray-50 text-slate-800 border border-gray-200'
            } shadow-lg`}>
              🌐
            </button>
            <div className={`absolute right-0 top-10 sm:top-12 rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
              isDark 
                ? 'bg-gray-900 border-green-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="p-2 min-w-32 sm:min-w-48">
                <div className={`text-xs font-semibold mb-2 px-2 ${isDark ? 'text-green-400' : 'text-slate-600'}`}>
                  {t.language}
                </div>
                {Object.entries(languageNames).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => setLanguage(code as Language)}
                    className={`w-full text-left px-2 py-1 rounded text-xs sm:text-sm transition-colors ${
                      language === code
                        ? isDark ? 'bg-green-700 text-green-100' : 'bg-green-100 text-green-800'
                        : isDark ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-slate-700'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Theme Selector */}
          <div className="relative group">
            <button className={`p-1.5 sm:p-2 rounded-lg transition-colors text-sm sm:text-base ${
              isDark 
                ? 'bg-gray-900 hover:bg-gray-800 text-green-400 border border-green-700' 
                : 'bg-white hover:bg-gray-50 text-slate-800 border border-gray-200'
            } shadow-lg`}>
              {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '💻'}
            </button>
            <div className={`absolute right-0 top-10 sm:top-12 rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
              isDark 
                ? 'bg-gray-900 border-green-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="p-2 min-w-24 sm:min-w-32">
                <div className={`text-xs font-semibold mb-2 px-2 ${isDark ? 'text-green-400' : 'text-slate-600'}`}>
                  {t.theme}
                </div>
                {(['light', 'dark', 'system'] as Theme[]).map((themeOption) => (
                  <button
                    key={themeOption}
                    onClick={() => setTheme(themeOption)}
                    className={`w-full text-left px-2 py-1 rounded text-xs sm:text-sm transition-colors flex items-center gap-1 sm:gap-2 ${
                      theme === themeOption
                        ? isDark ? 'bg-green-700 text-green-100' : 'bg-green-100 text-green-800'
                        : isDark ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-slate-700'
                    }`}
                  >
                    <span>{themeOption === 'light' ? '☀️' : themeOption === 'dark' ? '🌙' : '💻'}</span>
                    {t[themeOption as keyof typeof t]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-2 sm:px-0">
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 font-[Tektur,monospace] tracking-wide text-center ${
            isDark ? 'text-green-400' : 'text-slate-800'
          }`} style={{fontFamily: 'Tektur, monospace'}}>
            {translatedTitle}
          </h1>
        
          {/* Main Menu */}
          {!currentExercise && (
            <div className={`rounded-xl shadow-xl p-4 sm:p-6 lg:p-8 w-full max-w-xs sm:max-w-2xl lg:max-w-5xl border transition-colors ${
              isDark 
                ? 'bg-gray-950/90 border-green-800' 
                : 'bg-white border-gray-200'
            }`} style={{fontFamily: 'Tektur, monospace'}}>
              <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-6 sm:mb-8 text-center font-[Tektur,monospace] ${
                isDark ? 'text-green-400' : 'text-slate-700'
              }`}>{t.availableExercises}</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Exercise 1 - Sirius AG */}
                <div className={`border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-green-700 hover:border-green-600' 
                    : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:border-green-300'
                }`}>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-2 sm:mb-3 font-[Tektur,monospace] ${
                    isDark ? 'text-green-400' : 'text-green-800'
                  }`}>{t.exercise1}</h3>
                  <h4 className={`text-base sm:text-lg mb-2 sm:mb-3 font-[Tektur,monospace] ${
                    isDark ? 'text-green-300' : 'text-blue-700'
                  }`}>{t.exercise1Title}</h4>
                  <p className={`mb-4 text-sm leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-slate-600'
                  }`}>{t.exercise1Desc}</p>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                      isDark ? 'bg-green-800/50 text-green-300' : 'bg-green-200 text-green-800'
                    }`}>{t.marketAnalysis}</span>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                      isDark ? 'bg-green-800/50 text-green-300' : 'bg-green-200 text-green-800'
                    }`}>{t.percentageCalculation}</span>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                      isDark ? 'bg-green-800/50 text-green-300' : 'bg-green-200 text-green-800'
                    }`}>{t.trendCalculation}</span>
                  </div>
                  <button
                    onClick={() => setCurrentExercise('sirius')}
                    className={`w-full font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-200 font-[Tektur,monospace] shadow-sm text-sm sm:text-base ${
                      isDark 
                        ? 'bg-green-700 hover:bg-green-600 text-black' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    style={{fontFamily: 'Tektur, monospace'}}
                  >
                    {t.startExercise}
                  </button>
                </div>
                
                {/* Exercise 2 - Customer Survey */}
                <div className={`border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-green-700 hover:border-green-600' 
                    : 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:border-emerald-300'
                }`}>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-2 sm:mb-3 font-[Tektur,monospace] ${
                    isDark ? 'text-green-400' : 'text-emerald-800'
                  }`}>{t.exercise2}</h3>
                  <h4 className={`text-base sm:text-lg mb-2 sm:mb-3 font-[Tektur,monospace] ${
                    isDark ? 'text-green-300' : 'text-emerald-700'
                  }`}>{t.exercise2Title}</h4>
                  <p className={`mb-4 text-sm leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-slate-600'
                  }`}>{t.exercise2Desc}</p>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                      isDark ? 'bg-green-800/50 text-green-300' : 'bg-emerald-200 text-emerald-800'
                    }`}>{t.customerSatisfaction}</span>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                      isDark ? 'bg-green-800/50 text-green-300' : 'bg-emerald-200 text-emerald-800'
                    }`}>{t.statistics}</span>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                      isDark ? 'bg-green-800/50 text-green-300' : 'bg-emerald-200 text-emerald-800'
                    }`}>{t.averageValues}</span>
                  </div>
                  <button
                    onClick={() => setCurrentExercise('customer')}
                    className={`w-full font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-200 font-[Tektur,monospace] shadow-sm text-sm sm:text-base ${
                      isDark 
                        ? 'bg-green-700 hover:bg-green-600 text-black' 
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                    style={{fontFamily: 'Tektur, monospace'}}
                  >
                    {t.startExercise}
                  </button>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8 text-center">
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t.selectExercise}</p>
              </div>
            </div>
          )}

        {/* Exercise 1 - Sirius AG */}
        {currentExercise === 'sirius' && (
          <div className={`rounded-xl shadow-xl p-4 sm:p-6 lg:p-8 w-full max-w-xs sm:max-w-4xl lg:max-w-6xl border transition-colors ${
            isDark 
              ? 'bg-gray-950/90 border-green-800' 
              : 'bg-white border-gray-200'
          }`} style={{fontFamily: 'Tektur, monospace'}}>
            {/* Back to Menu Button */}
            <div className="mb-4 sm:mb-6">
              <button
                onClick={resetToMenu}
                className={`font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 font-[Tektur,monospace] shadow-sm text-sm sm:text-base ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-green-400 border border-green-700' 
                    : 'bg-slate-600 hover:bg-slate-700 text-white'
                }`}
                style={{fontFamily: 'Tektur, monospace'}}
              >
                ← {t.backToMenu}
              </button>
            </div>
            
            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 text-center font-[Tektur,monospace] ${
              isDark ? 'text-green-400' : 'text-slate-800'
            }`}>{t.exercise1Title}</h2>

            {/* Introduction and Problem Statement */}
          <div className="mb-6 sm:mb-8">
            <div className="text-center mb-4 sm:mb-6">
              <button
                onClick={() => setShowProblem(!showProblem)}
                className={`font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 shadow-sm font-[Tektur,monospace] text-sm sm:text-base ${
                  isDark 
                    ? 'bg-green-700 hover:bg-green-600 text-black' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                style={{fontFamily: 'Tektur, monospace'}}
              >
                {showProblem ? t.hideTask : t.showTask}
              </button>
            </div>
            
            {showProblem && (
              <div className={`border rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 transition-colors ${
                isDark 
                  ? 'bg-gray-900/50 border-green-700' 
                  : 'bg-green-50 border-green-200'
              }`}>
                <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 font-[Tektur,monospace] ${
                  isDark ? 'text-green-400' : 'text-green-800'
                }`}>{t.taskStatement}</h3>
                <div className={`rounded-lg p-3 sm:p-4 leading-relaxed shadow-sm ${
                  isDark ? 'bg-gray-950/70 text-gray-300' : 'bg-white text-slate-700'
                }`}>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                    <strong>{t.siriusTask}</strong>
                  </p>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base">{t.dataAvailable}</p>
                  
                  <div className={`rounded p-2 sm:p-3 mb-3 sm:mb-4 font-mono text-xs sm:text-sm overflow-x-auto ${
                    isDark ? 'bg-black/50' : 'bg-gray-900/80'
                  }`}>
                    <div className="min-w-max">
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                        <div className="text-green-400 font-semibold">{t.period}</div>
                        <div className="text-green-400 font-semibold">{t.industry}</div>
                        <div className="text-green-400 font-semibold">{t.sirius}</div>
                        {data.map((row) => (
                          <React.Fragment key={row.halbjahr}>
                            <div className="text-green-300">{translatePeriod(row.halbjahr, t)}</div>
                            <div className="text-green-300">{row.branche}</div>
                            <div className="text-green-300">{row.sirius}</div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className={`border-l-4 pl-3 sm:pl-4 ${
                      isDark 
                        ? 'bg-yellow-900/20 border-yellow-400' 
                        : 'bg-yellow-900/30 border-yellow-500'
                    }`}>
                      <strong className={`text-sm sm:text-base ${isDark ? 'text-yellow-400' : 'text-yellow-300'}`}>{t.taskLabelA}</strong>
                      <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t.taskA}</p>
                    </div>
                    <div className={`border-l-4 pl-3 sm:pl-4 ${
                      isDark 
                        ? 'bg-yellow-900/20 border-yellow-400' 
                        : 'bg-yellow-900/30 border-yellow-500'
                    }`}>
                      <strong className={`text-sm sm:text-base ${isDark ? 'text-yellow-400' : 'text-yellow-300'}`}>{t.taskLabelB}</strong>
                      <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t.taskB}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Data Table - Always visible when problem is shown */}
          {showProblem && (
            <div className="mb-6 sm:mb-8">
              <div className="text-center mb-4 sm:mb-6">
                <button
                  onClick={() => setShowCalculatedTable(!showCalculatedTable)}
                  className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 shadow-sm font-[Tektur,monospace] text-sm sm:text-base"
                  style={{fontFamily: 'Tektur, monospace'}}
                >
                  {showCalculatedTable ? t.hideCalculatedShares : t.showCalculatedShares}
                </button>
              </div>
              
              {showCalculatedTable && (
                <div className={`border rounded-xl p-3 sm:p-4 lg:p-6 ${
                  isDark ? 'bg-slate-800/60 border-slate-600' : 'bg-slate-50 border-slate-200'
                }`}>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 font-[Tektur,monospace] ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>{t.calculatedShares}</h3>
                  
                  <div className={`rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm ${
                    isDark ? 'bg-gray-950/50 text-gray-300' : 'bg-white text-slate-700'
                  }`}>
                    <h4 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${
                      isDark ? 'text-gray-200' : 'text-slate-700'
                    }`}>
                      {t.calculationBasis}
                    </h4>
                    <div className={`space-y-2 sm:space-y-3 text-xs sm:text-sm ${
                      isDark ? 'text-gray-300' : 'text-slate-600'
                    }`}>
                      <p className="text-sm sm:text-base"><strong>{t.basicFormula}</strong></p>
                      <div className={`p-2 sm:p-3 rounded font-mono text-center border text-xs sm:text-sm ${
                        isDark ? 'bg-green-900/30 border-green-700 text-green-300' : 'bg-green-50 border-green-200 text-green-800'
                      }`}>
                        <span>{t.basicFormulaText}</span>
                      </div>
                      <p className="text-sm sm:text-base"><strong>{t.exampleCalc}</strong></p>
                      <div className={`p-2 sm:p-3 rounded font-mono border text-xs sm:text-sm ${
                        isDark ? 'bg-slate-800/50 border-slate-600 text-gray-300' : 'bg-slate-50 border-slate-300 text-slate-700'
                      }`}>
                        <div>{t.siriusRevenue}: 1.6 Mio €</div>
                        <div>{t.industryRevenue}: 20.0 Mio €</div>
                        <div className="text-green-400 mt-1 sm:mt-2">{t.marketShareTerm} = (1.6 / 20.0) × 100 = 8.00%</div>
                      </div>
                      <p className="text-sm sm:text-base"><strong>{t.calculateIncrease}:</strong></p>
                      <div className="bg-gray-700 p-2 sm:p-3 rounded font-mono text-xs sm:text-sm">
                        <span className="text-yellow-400">{t.percentageIncreaseFormula2}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ultra-compact mobile-first responsive table */}
                  <div className="mb-6 sm:mb-8">
                    {/* Ultra-compact Mobile Layout */}
                    <div className="block lg:hidden">
                      {/* Compact grid for small screens */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {marketShares.map((row, index) => {
                          const percentageIncrease = index === 0 ? null : 
                            ((row.marketShare - marketShares[index - 1].marketShare) / marketShares[index - 1].marketShare) * 100;
                          
                          return (
                            <div key={row.halbjahr} className="bg-gray-800/60 rounded-md p-2 border border-gray-700">
                              <div className="text-green-400 font-bold text-xs mb-2 text-center border-b border-gray-600 pb-1">
                                {translatePeriod(row.halbjahr, t)}
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-green-300 truncate pr-1">Industry</span>
                                  <span className="text-white font-medium">{row.branche.toFixed(1)}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-green-300 truncate pr-1">Sirius</span>
                                  <span className="text-white font-medium">{row.sirius.toFixed(1)}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-green-300 truncate pr-1">Share</span>
                                  <span className={`font-bold ${
                                    (showSolutionA && row.halbjahr === maxShare.halbjahr) 
                                      ? "bg-green-900/60 text-green-200 px-1 py-0.5 rounded text-xs" 
                                      : "text-white"
                                  }`}>
                                    {row.marketShare.toFixed(2)}%
                                  </span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-green-300 truncate pr-1">Change</span>
                                  <span className={`text-xs ${
                                    (showSolutionB && maxInc.to && row.halbjahr === maxInc.to.halbjahr)
                                      ? "bg-yellow-900/60 text-yellow-200 font-bold px-1 py-0.5 rounded"
                                      : ""
                                  }`}>
                                    {percentageIncrease === null ? 
                                      <span className="text-gray-500">—</span> : 
                                      <span className={`font-bold ${percentageIncrease >= 0 ? "text-green-400" : "text-red-400"}`}>
                                        {percentageIncrease >= 0 ? "+" : ""}{percentageIncrease.toFixed(1)}%
                                      </span>
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Desktop Table Layout */}
                    <div className="hidden lg:block overflow-x-auto">
                      <table className="w-full text-gray-200 border-separate border-spacing-y-1 sm:border-spacing-y-2">
                        <thead>
                          <tr className="text-green-400 text-sm sm:text-lg">
                            <th className="p-2 text-left text-base">{t.dataType}</th>
                            {marketShares.map((row) => (
                              <th key={row.halbjahr} className="p-2 text-center text-base">{translatePeriod(row.halbjahr, t)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {/* Branche Row */}
                          <tr className="bg-gray-800/60 hover:bg-gray-700/50 transition-all duration-200">
                            <td className="p-2 rounded-l-lg font-medium text-green-300 text-base">{t.industryRevenueMio}</td>
                            {marketShares.map((row) => (
                              <td key={row.halbjahr} className="p-2 text-center text-base">{row.branche.toFixed(1)}</td>
                            ))}
                          </tr>
                          
                          {/* Sirius AG Row */}
                          <tr className="bg-gray-800/60 hover:bg-gray-700/50 transition-all duration-200">
                            <td className="p-2 rounded-l-lg font-medium text-green-300 text-base">{t.siriusRevenueMio}</td>
                            {marketShares.map((row) => (
                              <td key={row.halbjahr} className="p-2 text-center text-base">{row.sirius.toFixed(1)}</td>
                            ))}
                          </tr>
                          
                          {/* Marktanteil Row */}
                          <tr className="bg-gray-800/60 hover:bg-gray-700/50 transition-all duration-200">
                            <td className="p-2 rounded-l-lg font-medium text-green-300 text-base">{t.marketSharePercent}</td>
                            {marketShares.map((row) => (
                              <td 
                                key={row.halbjahr} 
                                className={`p-2 text-center font-bold text-base ${
                                  (showSolutionA && row.halbjahr === maxShare.halbjahr) 
                                    ? "bg-green-900/60 text-green-200 shadow-lg rounded" 
                                    : ""
                                }`}
                              >
                                {row.marketShare.toFixed(2)}
                              </td>
                            ))}
                          </tr>
                          
                          {/* Anstieg Row */}
                          <tr className="bg-gray-800/60 hover:bg-gray-700/50 transition-all duration-200">
                            <td className="p-2 rounded-l-lg font-medium text-green-300 text-base">{t.increasePercent}</td>
                            {marketShares.map((row, index) => {
                              const percentageIncrease = index === 0 ? null : 
                                ((row.marketShare - marketShares[index - 1].marketShare) / marketShares[index - 1].marketShare) * 100;
                              
                              return (
                                <td 
                                  key={row.halbjahr} 
                                  className={`p-2 text-center text-base ${
                                    (showSolutionB && maxInc.to && row.halbjahr === maxInc.to.halbjahr)
                                      ? "bg-yellow-900/60 text-yellow-200 font-bold shadow-lg rounded"
                                      : ""
                                  }`}
                                >
                                  {percentageIncrease === null ? 
                                    <span className="text-gray-500">—</span> : 
                                    <span className={`font-bold ${percentageIncrease >= 0 ? "text-green-400" : "text-red-400"}`}>
                                      {percentageIncrease >= 0 ? "+" : ""}{percentageIncrease.toFixed(2)}%
                                    </span>
                                  }
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="bg-green-900/30 rounded-lg p-3 sm:p-4 border-l-4 border-green-500">
                    <h4 className="text-green-300 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">🔍 {t.stepByStepExplanation}</h4>
                    <ol className="list-decimal list-inside space-y-1 sm:space-y-2 text-gray-200 text-xs sm:text-sm">
                      <li><strong>{t.step1}</strong> {t.step1Description}</li>
                      <li><strong>{t.step2}</strong> {t.step2Description}</li>
                      <li><strong>{t.step3}</strong> {t.step3Description}</li>
                      <li><strong>{t.step4}</strong> {t.step4Description}</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Solution Buttons */}
          {showProblem && showCalculatedTable && (
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-6 sm:mb-8">
              <button
                onClick={() => setShowSolutionA(!showSolutionA)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-[Tektur,monospace] text-sm sm:text-base"
                style={{fontFamily: 'Tektur, monospace'}}
              >
                {showSolutionA ? t.solutionAHide : t.solutionA}
              </button>
              
              <button
                onClick={() => setShowSolutionB(!showSolutionB)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-[Tektur,monospace] text-sm sm:text-base"
                style={{fontFamily: 'Tektur, monospace'}}
              >
                {showSolutionB ? t.solutionBHide : t.solutionB}
              </button>
              
              <button
                onClick={() => setShowCompleteAnalysis(!showCompleteAnalysis)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-[Tektur,monospace] text-sm sm:text-base"
                style={{fontFamily: 'Tektur, monospace'}}
              >
                {showCompleteAnalysis ? t.hideCompleteAnalysis : t.showCompleteAnalysis}
              </button>
            </div>
          )}

          {/* Solution A */}
          {showSolutionA && (
            <div className="mb-6 bg-green-900/20 border border-green-600 rounded-xl p-6">
              <h2 className="text-2xl text-green-300 font-semibold mb-4 font-[Tektur,monospace]">✅ {t.solutionATitle}</h2>
              <div className="bg-gray-800/60 rounded-lg p-4">
                <p className="text-gray-100 text-lg mb-4">
                  <span className="text-green-400 font-bold">{translatePeriod(maxShare.halbjahr, t)}</span> {t.hadHighestMarketShare} <span className="text-green-400 font-bold">{maxShare.marketShare.toFixed(2)}%</span>.
                </p>
                
                <div className="bg-green-900/30 rounded-lg p-4 border-l-4 border-green-500">
                  <h4 className="text-green-300 font-semibold mb-3">💡 {t.calculationExplanation}</h4>
                  <div className="space-y-2 text-gray-200">
                    <p><strong>{t.formula}</strong> <span className="bg-gray-700 px-2 py-1 rounded font-mono">{t.marketShareFormulaSpecific}</span></p>
                    <p><strong>{t.example} {translatePeriod(maxShare.halbjahr, t)}:</strong></p>
                    <p className="ml-4 font-mono bg-gray-700 p-2 rounded">
                      {t.marketShareTerm} = ({maxShare.sirius} Mio € / {maxShare.branche} Mio €) × 100 = {maxShare.marketShare.toFixed(2)}%
                    </p>
                    <p><strong>{t.meaning}</strong> {t.strongestMarketPosition}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Solution B */}
          {showSolutionB && (
            <div className="mb-6 bg-yellow-900/20 border border-yellow-600 rounded-xl p-6">
              <h2 className="text-2xl text-yellow-300 font-semibold mb-4 font-[Tektur,monospace]">✅ {t.solutionBTitle}</h2>
              <div className="bg-gray-800/60 rounded-lg p-4">
                <p className="text-gray-100 text-lg mb-4">
                  {maxInc.from && maxInc.to ? (
                    <>
                      {t.largestPercentageIncrease} <span className="text-yellow-400 font-bold">{translatePeriod(maxInc.from.halbjahr, t)}</span> ({maxInc.from.marketShare.toFixed(2)}%) {t.to} <span className="text-yellow-400 font-bold">{translatePeriod(maxInc.to.halbjahr, t)}</span> ({maxInc.to.marketShare.toFixed(2)}%) {t.withIncrease} <span className="text-yellow-400 font-bold">{maxInc.percentageIncrease.toFixed(2)}%</span>.
                    </>
                  ) : (
                    t.notAvailable
                  )}
                </p>
                
                <div className="bg-yellow-900/30 rounded-lg p-4 border-l-4 border-yellow-500">
                  <h4 className="text-yellow-300 font-semibold mb-3">💡 {t.calculationExplanation}</h4>
                  <div className="space-y-2 text-gray-200">
                    <p><strong>{t.formula}</strong> <span className="bg-gray-700 px-2 py-1 rounded font-mono">{t.percentageIncreaseFormula}</span></p>
                    {maxInc.from && maxInc.to && (
                      <>
                        <p><strong>{t.calculation}</strong></p>
                        <p className="ml-4 font-mono bg-gray-700 p-2 rounded">
                          ({maxInc.to.marketShare.toFixed(2)}% - {maxInc.from.marketShare.toFixed(2)}%) / {maxInc.from.marketShare.toFixed(2)}% × 100 = {maxInc.percentageIncrease.toFixed(2)}%
                        </p>
                        <p><strong>{t.absoluteIncrease}</strong> {maxInc.increase.toFixed(2)} {t.percentagePoints}</p>
                      </>
                    )}
                    <p><strong>{t.meaning}</strong> {t.meaningLargestGrowth}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Complete Analysis */}
          {showCompleteAnalysis && (
            <div className="bg-purple-900/20 border border-purple-600 rounded-xl p-6">
              <h2 className="text-2xl text-purple-300 font-semibold mb-4 font-[Tektur,monospace]">🔍 {t.stepByStepAnalysis}</h2>
              <div className="bg-gray-800/60 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-purple-300 font-semibold text-lg">📝 {t.methodicalApproach}</h4>
                    <ol className="list-decimal list-inside space-y-3 text-gray-200">
                      <li className="bg-gray-700/50 p-3 rounded">
                        <strong className="text-green-400">{t.dataCollection}</strong><br/>
                        <span className="text-sm">{t.collectRevenueData}</span>
                      </li>
                      <li className="bg-gray-700/50 p-3 rounded">
                        <strong className="text-green-400">{t.calculateMarketShare}</strong><br/>
                        <span className="text-sm">{t.applyFormula}</span>
                      </li>
                      <li className="bg-gray-700/50 p-3 rounded">
                        <strong className="text-green-400">{t.identifyMaximum}</strong><br/>
                        <span className="text-sm">{t.compareAllShares}</span>
                      </li>
                      <li className="bg-gray-700/50 p-3 rounded">
                        <strong className="text-green-400">{t.calculateIncreaseRates}</strong><br/>
                        <span className="text-sm">{t.percentageChanges}</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-purple-300 font-semibold text-lg">📊 {t.importantInsights}</h4>
                    <div className="space-y-3">
                      <div className="bg-green-900/30 p-3 rounded border-l-4 border-green-500">
                        <strong className="text-green-400">{t.highestMarketShare}</strong><br/>
                        <span className="text-sm">{translatePeriod(maxShare.halbjahr, t)} {t.with} {maxShare.marketShare.toFixed(2)}% - {t.showsStrongestPosition}</span>
                      </div>
                      <div className="bg-yellow-900/30 p-3 rounded border-l-4 border-yellow-500">
                        <strong className="text-yellow-400">{t.strongestIncrease}</strong><br/>
                        <span className="text-sm">{maxInc.percentageIncrease?.toFixed(2)}% {t.showsDynamicDevelopment}</span>
                      </div>
                      <div className="bg-green-900/30 p-3 rounded border-l-4 border-green-500">
                        <strong className="text-green-400">{t.trendAnalysis}</strong><br/>
                        <span className="text-sm">{t.continuousGrowth}</span>
                      </div>
                      <div className="bg-gray-700/50 p-3 rounded border-l-4 border-gray-500">
                        <strong className="text-gray-300">{t.businessRelevance}</strong><br/>
                        <span className="text-sm">{t.positiveMarketDevelopment}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        )}

        {/* Exercise 2 - Customer Survey */}
        {currentExercise === 'customer' && (
          <div className={`rounded-xl shadow-xl p-4 sm:p-6 lg:p-8 w-full max-w-xs sm:max-w-4xl lg:max-w-6xl border transition-colors ${
            isDark 
              ? 'bg-gray-950/90 border-green-800' 
              : 'bg-white border-gray-200'
          }`} style={{fontFamily: 'Tektur, monospace'}}>
            {/* Back to Menu Button */}
            <div className="mb-4 sm:mb-6">
              <button
                onClick={resetToMenu}
                className={`font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 font-[Tektur,monospace] shadow-sm text-sm sm:text-base ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-green-400 border border-green-700' 
                    : 'bg-slate-600 hover:bg-slate-700 text-white'
                }`}
                style={{fontFamily: 'Tektur, monospace'}}
              >
                ← {t.backToMenu}
              </button>
            </div>
            
            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 text-center font-[Tektur,monospace] ${
              isDark ? 'text-green-400' : 'text-slate-800'
            }`}>{t.exercise2Title}</h2>

            {/* Introduction and Problem Statement */}
            <div className={`border rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 transition-colors ${
              isDark 
                ? 'bg-gray-900/50 border-green-700' 
                : 'bg-emerald-50 border-emerald-200'
            }`} style={{fontFamily: 'Tektur, monospace'}}>
              <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                <h3 className={`text-lg sm:text-xl font-semibold font-[Tektur,monospace] ${
                  isDark ? 'text-green-400' : 'text-emerald-800'
                }`}>{t.taskDescription}</h3>
              </div>
              
              {!showCustomerProblem ? (
                <button
                  onClick={() => setShowCustomerProblem(true)}
                  className={`font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 font-[Tektur,monospace] shadow-sm text-sm sm:text-base ${
                    isDark 
                      ? 'bg-green-700 hover:bg-green-600 text-black' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                  style={{fontFamily: 'Tektur, monospace'}}
                >
                  {t.showTask}
                </button>
              ) : (
                <div className={`leading-relaxed text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  <p className="mb-3 sm:mb-4">
                    {t.surveyDescription}
                  </p>
                  <p className={`mb-3 sm:mb-4 font-semibold ${
                    isDark ? 'text-green-400' : 'text-emerald-700'
                  }`}>
                    {t.gradeSystem}
                  </p>
                  <div className={`border p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 shadow-sm ${
                    isDark 
                      ? 'bg-gray-950/70 border-green-700' 
                      : 'bg-white border-emerald-200'
                  }`}>
                    <p className={`font-semibold mb-2 text-sm sm:text-base ${
                      isDark ? 'text-green-400' : 'text-slate-800'
                    }`}>{t.tasks}</p>
                    <ul className={`list-disc list-inside space-y-1 text-xs sm:text-sm ${
                      isDark ? 'text-gray-300' : 'text-slate-600'
                    }`}>
                      <li><strong>a)</strong> {t.taskCustomerA}</li>
                      <li><strong>b)</strong> {t.taskCustomerB}</li>
                      <li><strong>c)</strong> {t.taskCustomerC}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Data Table */}
            {showCustomerProblem && (
              <div className={`border rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 transition-colors ${
                isDark 
                  ? 'bg-gray-900/50 border-green-700' 
                  : 'bg-slate-50 border-slate-200'
              }`} style={{fontFamily: 'Tektur, monospace'}}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-3">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <h3 className={`text-lg sm:text-xl font-semibold font-[Tektur,monospace] ${
                      isDark ? 'text-green-400' : 'text-slate-800'
                    }`}>{t.customerSurvey}</h3>
                  </div>
                  {!showCustomerTable && (
                    <button
                      onClick={() => setShowCustomerTable(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 font-[Tektur,monospace] shadow-sm text-sm sm:text-base"
                      style={{fontFamily: 'Tektur, monospace'}}
                    >
                      {t.showTableCustomer}
                    </button>
                  )}
                </div>
                
                {showCustomerTable && (
                  <div className="overflow-x-auto">
                    <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-blue-900/20 rounded-lg border border-blue-600">
                      <h4 className="text-base sm:text-lg font-semibold text-blue-300 mb-2 sm:mb-3 font-[Tektur,monospace]">📊 {t.ratingLegend}</h4>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2">
                        {[1, 2, 3, 4, 5, 6].map(grade => (
                          <div key={grade} className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-center text-xs sm:text-sm font-bold ${getGradeColor(grade)} font-[Tektur,monospace]`}>
                            <div className="sm:hidden">{grade}</div>
                            <div className="hidden sm:block">{grade} - {getGradeLabel(grade, t)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Ultra-compact mobile-first responsive customer table */}
                    <div>
                      {/* Ultra-compact Mobile Layout */}
                      <div className="block lg:hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {calculateCustomerAverages().map((customer, index) => (
                            <div key={customer.kunde} className={`rounded-md p-2 border border-gray-600 ${
                              index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-900/50"
                            }`}>
                              <div className="text-green-200 font-bold text-xs mb-2 text-center border-b border-gray-600 pb-1 font-[Tektur,monospace]">
                                {customer.kunde}
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-green-200 font-[Tektur,monospace] truncate pr-1">Func</span>
                                  <span className={`px-1 py-0.5 rounded font-bold text-xs ${getGradeColor(customer.funktion)} font-[Tektur,monospace]`}>
                                    {customer.funktion}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-green-200 font-[Tektur,monospace] truncate pr-1">Perf</span>
                                  <span className={`px-1 py-0.5 rounded font-bold text-xs ${getGradeColor(customer.leistung)} font-[Tektur,monospace]`}>
                                    {customer.leistung}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-green-200 font-[Tektur,monospace] truncate pr-1">Eco</span>
                                  <span className={`px-1 py-0.5 rounded font-bold text-xs ${getGradeColor(customer.oeko)} font-[Tektur,monospace]`}>
                                    {customer.oeko}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-green-200 font-[Tektur,monospace] truncate pr-1">Price</span>
                                  <span className={`px-1 py-0.5 rounded font-bold text-xs ${getGradeColor(customer.preis)} font-[Tektur,monospace]`}>
                                    {customer.preis}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center border-t border-gray-600 pt-1 text-xs">
                                  <span className="text-green-300 font-bold font-[Tektur,monospace] truncate pr-1">Avg</span>
                                  <span className={`px-1 py-0.5 rounded font-bold text-xs ${getAverageGradeColor(customer.durchschnitt!)} font-[Tektur,monospace]`}>
                                    {customer.durchschnitt?.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Desktop Table Layout */}
                      <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-600 rounded-lg overflow-hidden">
                          <thead>
                            <tr className="bg-green-800/50">
                              <th className="border border-gray-600 px-4 py-3 text-green-200 font-[Tektur,monospace] text-sm">{t.customer}</th>
                              <th className="border border-gray-600 px-4 py-3 text-green-200 font-[Tektur,monospace] text-sm">{t.function}</th>
                              <th className="border border-gray-600 px-4 py-3 text-green-200 font-[Tektur,monospace] text-sm">{t.performance}</th>
                              <th className="border border-gray-600 px-4 py-3 text-green-200 font-[Tektur,monospace] text-sm">{t.eco}</th>
                              <th className="border border-gray-600 px-4 py-3 text-green-200 font-[Tektur,monospace] text-sm">{t.price}</th>
                              <th className="border border-gray-600 px-4 py-3 text-green-300 font-[Tektur,monospace] text-sm">{t.average}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {calculateCustomerAverages().map((customer, index) => (
                              <tr key={customer.kunde} className={index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-900/50"}>
                                <td className="border border-gray-600 px-4 py-3 text-white font-bold font-[Tektur,monospace] text-sm">{customer.kunde}</td>
                                <td className="border border-gray-600 px-2 py-3 text-center font-[Tektur,monospace]">
                                  <span className={`px-3 py-1 rounded-lg font-bold text-sm ${getGradeColor(customer.funktion)}`}>
                                    {customer.funktion}
                                  </span>
                                </td>
                                <td className="border border-gray-600 px-2 py-3 text-center font-[Tektur,monospace]">
                                  <span className={`px-3 py-1 rounded-lg font-bold text-sm ${getGradeColor(customer.leistung)}`}>
                                    {customer.leistung}
                                  </span>
                                </td>
                                <td className="border border-gray-600 px-2 py-3 text-center font-[Tektur,monospace]">
                                  <span className={`px-3 py-1 rounded-lg font-bold text-sm ${getGradeColor(customer.oeko)}`}>
                                    {customer.oeko}
                                  </span>
                                </td>
                                <td className="border border-gray-600 px-2 py-3 text-center font-[Tektur,monospace]">
                                  <span className={`px-3 py-1 rounded-lg font-bold text-sm ${getGradeColor(customer.preis)}`}>
                                    {customer.preis}
                                  </span>
                                </td>
                                <td className="border border-gray-600 px-2 py-3 text-center font-[Tektur,monospace]">
                                  <span className={`px-3 py-2 rounded-lg font-bold text-sm ${getAverageGradeColor(customer.durchschnitt!)}`}>
                                    {customer.durchschnitt?.toFixed(2)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Solution A */}
            {showCustomerTable && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6" style={{fontFamily: 'Tektur, monospace'}}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-semibold text-green-800 font-[Tektur,monospace]">{t.solutionALabel} (≤ 2,5)</h3>
                  </div>
                  {!showCustomerSolutionA && (
                    <button
                      onClick={() => setShowCustomerSolutionA(true)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 font-[Tektur,monospace] shadow-sm"
                      style={{fontFamily: 'Tektur, monospace'}}
                    >
                      {t.showSolutionCustomer}
                    </button>
                  )}
                </div>
                
                {showCustomerSolutionA && (
                  <div className={`leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    <div className={`border p-4 rounded-lg mb-4 shadow-sm ${
                      isDark ? 'bg-gray-800/50 border-green-700 text-gray-300' : 'bg-white border-green-200 text-slate-700'
                    }`}>
                      <h4 className={`text-lg font-semibold mb-3 font-[Tektur,monospace] ${
                        isDark ? 'text-green-400' : 'text-green-800'
                      }`}>{t.calculation}</h4>
                      <div className="space-y-2">
                        <p>{t.customersWithAverage} ≤ 2,5 ({t.goodAndBetter}):</p>
                        <div className="bg-green-50 border border-green-200 p-3 rounded text-sm font-mono">
                          {calculateCustomerAverages()
                            .filter(customer => customer.durchschnitt! <= 2.5)
                            .map(customer => `Kunde ${customer.kunde}: ${customer.durchschnitt?.toFixed(2)}`)
                            .join(', ')}
                        </div>
                        <p>{t.numberOfCustomers} {t.goodAndBetter}: {calculateCustomerAverages().filter(customer => customer.durchschnitt! <= 2.5).length}</p>
                        <p>{t.totalCustomers} {customerData.length}</p>
                        <p className="text-green-700 font-semibold text-lg">
                          {t.result} {calculateGoodOrBetterPercentage().toFixed(1)}% {t.haveRated} {t.goodAndBetter} {t.rated}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Solution B */}
            {showCustomerSolutionA && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6" style={{fontFamily: 'Tektur, monospace'}}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-semibold text-orange-800 font-[Tektur,monospace]">{t.solutionBLabel} (≥ 3,5)</h3>
                  </div>
                  {!showCustomerSolutionB && (
                    <button
                      onClick={() => setShowCustomerSolutionB(true)}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 font-[Tektur,monospace] shadow-sm"
                      style={{fontFamily: 'Tektur, monospace'}}
                    >
                      {t.showSolutionCustomer}
                    </button>
                  )}
                </div>
                
                {showCustomerSolutionB && (
                  <div className={`leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    <div className={`border p-4 rounded-lg mb-4 shadow-sm ${
                      isDark ? 'bg-gray-800/50 border-orange-700 text-gray-300' : 'bg-white border-orange-200 text-slate-700'
                    }`}>
                      <h4 className={`text-lg font-semibold mb-3 font-[Tektur,monospace] ${
                        isDark ? 'text-orange-400' : 'text-orange-800'
                      }`}>{t.calculation}</h4>
                      <div className="space-y-2">
                        <p>{t.customersWithAverage} ≥ 3,5 ({t.satisfactoryAndWorse}):</p>
                        <div className="bg-orange-50 border border-orange-200 p-3 rounded text-sm font-mono">
                          {calculateCustomerAverages()
                            .filter(customer => customer.durchschnitt! >= 3.5)
                            .map(customer => `Kunde ${customer.kunde}: ${customer.durchschnitt?.toFixed(2)}`)
                            .join(', ') || t.noCustomers}
                        </div>
                        <p>{t.numberOfCustomers} {t.satisfactoryAndWorse}: {calculateCustomerAverages().filter(customer => customer.durchschnitt! >= 3.5).length}</p>
                        <p>{t.totalCustomers} {customerData.length}</p>
                        <p className="text-orange-300 font-bold text-lg">
                          {t.result} {calculateSufficientOrWorsePercentage().toFixed(1)}% {t.haveRated} {t.satisfactoryAndWorse} {t.rated}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Solution C */}
            {showCustomerSolutionB && (
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-6" style={{fontFamily: 'Tektur, monospace'}}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-semibold text-teal-800 font-[Tektur,monospace]">{t.solutionCLabel}: {t.ecoAverageGrade}</h3>
                  </div>
                  {!showCustomerSolutionC && (
                    <button
                      onClick={() => setShowCustomerSolutionC(true)}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 font-[Tektur,monospace] shadow-sm"
                      style={{fontFamily: 'Tektur, monospace'}}
                    >
                      {t.showSolutionCustomer}
                    </button>
                  )}
                </div>
                
                {showCustomerSolutionC && (
                  <div className={`leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    <div className={`border p-4 rounded-lg mb-4 shadow-sm ${
                      isDark ? 'bg-gray-800/50 border-teal-700 text-gray-300' : 'bg-white border-teal-200 text-slate-700'
                    }`}>
                      <h4 className={`text-lg font-semibold mb-3 font-[Tektur,monospace] ${
                        isDark ? 'text-teal-400' : 'text-teal-800'
                      }`}>{t.calculation}</h4>
                      <div className="space-y-2">
                        <p>{t.allCustomersEcoRatings}</p>
                        <div className="bg-teal-50 border border-teal-200 p-3 rounded text-sm font-mono">
                          {customerData.map(customer => `Kunde ${customer.kunde}: ${customer.oeko}`).join(', ')}
                        </div>
                        <p>{t.sumOfRatings} {customerData.reduce((sum, customer) => sum + customer.oeko, 0)}</p>
                        <p>{t.totalCustomers} {customerData.length}</p>
                        <p>{t.calculation} {customerData.reduce((sum, customer) => sum + customer.oeko, 0)} ÷ {customerData.length} = {calculateEcoAverageGrade().toFixed(2)}</p>
                        <p className="text-teal-300 font-bold text-lg">
                          {t.result} {calculateEcoAverageGrade().toFixed(2)} ({getGradeDescription(calculateEcoAverageGrade(), t)})
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Complete Analysis */}
            {showCustomerSolutionC && (
              <div className="bg-purple-900/20 border border-purple-600 rounded-xl p-6 mb-6" style={{fontFamily: 'Tektur, monospace'}}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">📈</div>
                    <h3 className="text-xl font-bold text-purple-300 font-[Tektur,monospace]">{t.summary}</h3>
                  </div>
                  {!showCustomerAnalysis && (
                    <button
                      onClick={() => setShowCustomerAnalysis(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 font-[Tektur,monospace]"
                      style={{fontFamily: 'Tektur, monospace'}}
                    >
                      {t.showOverallAnalysis}
                    </button>
                  )}
                </div>
                
                {showCustomerAnalysis && (
                  <div className="text-gray-300 leading-relaxed">
                    <div className="bg-purple-800/30 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold text-purple-200 mb-4 font-[Tektur,monospace]">{t.surveyResults}</h4>
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-green-900/30 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-300">{calculateGoodOrBetterPercentage().toFixed(1)}%</div>
                          <div className="text-sm text-green-200">{t.goodAndBetterShort}</div>
                        </div>
                        <div className="bg-orange-900/30 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-orange-300">{calculateSufficientOrWorsePercentage().toFixed(1)}%</div>
                          <div className="text-sm text-orange-200">{t.satisfactoryAndWorseShort}</div>
                        </div>
                        <div className="bg-teal-900/30 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-teal-300">{calculateEcoAverageGrade().toFixed(2)}</div>
                          <div className="text-sm text-teal-200">{t.ecoAverage}</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p><strong>{t.interpretation}</strong></p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                          <li>{t.majorityOfCustomers} ({calculateGoodOrBetterPercentage().toFixed(1)}%) {t.ratedGoodOrBetter}</li>
                          <li>{t.onlyPercentage} {calculateSufficientOrWorsePercentage().toFixed(1)}% {t.gaveSatisfactoryOrWorse}</li>
                          <li>{t.ecoAspectsRated} {calculateEcoAverageGrade().toFixed(2)} {t.correspondTo} &quot;{getGradeDescription(calculateEcoAverageGrade(), t)}&quot;</li>
                          <li className="text-purple-200 font-semibold">
                            {t.recommendation} {calculateEcoAverageGrade() > 3.0 ? 
                              t.improveEcoAspects : 
                              t.ecoAspectsAlreadyGood}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        </div>
      </div>
    </>
  );
}
