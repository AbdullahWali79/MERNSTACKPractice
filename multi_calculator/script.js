// Basic Calculator Functions
let result = document.getElementById('result');

function appendToDisplay(value) {
    result.value += value;
}

function clearDisplay() {
    result.value = '';
}

function deleteLastChar() {
    result.value = result.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = result.value;
        // Replace × with * for calculation
        expression = expression.replace(/×/g, '*');
        // Handle percentage
        expression = expression.replace(/(\d+)%/g, (match, p1) => p1 / 100);
        result.value = eval(expression);
    } catch (error) {
        result.value = 'Error';
    }
}

// Calculator Switcher
function switchCalculator() {
    const calculatorType = document.getElementById('calculatorType').value;
    const calculators = document.querySelectorAll('.calculator');
    
    calculators.forEach(calc => {
        calc.style.display = 'none';
    });
    
    document.getElementById(`${calculatorType}-calculator`).style.display = 'block';
}

// Tip Calculator
function calculateTip() {
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const tipPercentage = parseFloat(document.getElementById('tipPercentage').value);
    const numPeople = parseInt(document.getElementById('numPeople').value) || 1;
    
    if (isNaN(billAmount) || isNaN(tipPercentage)) {
        document.getElementById('tipResult').innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const tipAmount = (billAmount * tipPercentage) / 100;
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / numPeople;
    
    document.getElementById('tipResult').innerHTML = `
        Tip Amount: $${tipAmount.toFixed(2)}<br>
        Total Amount: $${totalAmount.toFixed(2)}<br>
        Per Person: $${perPerson.toFixed(2)}
    `;
}

// Unit Converter
function convertUnit() {
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const value = parseFloat(document.getElementById('unitValue').value);
    
    if (isNaN(value)) {
        document.getElementById('unitResult').innerHTML = 'Please enter a valid number';
        return;
    }
    
    const conversionFactors = {
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001
    };
    
    const result = value * conversionFactors[fromUnit] / conversionFactors[toUnit];
    document.getElementById('unitResult').innerHTML = `${value} ${fromUnit} = ${result} ${toUnit}`;
}

// Discount Calculator
function calculateDiscount() {
    const originalPrice = parseFloat(document.getElementById('originalPrice').value);
    const discountPercentage = parseFloat(document.getElementById('discountPercentage').value);
    
    if (isNaN(originalPrice) || isNaN(discountPercentage)) {
        document.getElementById('discountResult').innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const finalPrice = originalPrice - discountAmount;
    
    document.getElementById('discountResult').innerHTML = `
        Original Price: $${originalPrice.toFixed(2)}<br>
        Discount Amount: $${discountAmount.toFixed(2)}<br>
        Final Price: $${finalPrice.toFixed(2)}
    `;
}

// Fuel Calculator
function calculateFuel() {
    const distance = parseFloat(document.getElementById('distance').value);
    const fuelEfficiency = parseFloat(document.getElementById('fuelEfficiency').value);
    const fuelPrice = parseFloat(document.getElementById('fuelPrice').value);
    
    if (isNaN(distance) || isNaN(fuelEfficiency) || isNaN(fuelPrice)) {
        document.getElementById('fuelResult').innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const fuelNeeded = distance / fuelEfficiency;
    const totalCost = fuelNeeded * fuelPrice;
    
    document.getElementById('fuelResult').innerHTML = `
        Fuel Needed: ${fuelNeeded.toFixed(2)} liters<br>
        Total Cost: $${totalCost.toFixed(2)}
    `;
}

// Date Calculator
function calculateDate() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        document.getElementById('dateResult').innerHTML = 'Please select valid dates';
        return;
    }
    
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    document.getElementById('dateResult').innerHTML = `
        Difference: ${diffDays} days
    `;
}

// GPA Calculator
function addGpaRow() {
    const gpaInputs = document.getElementById('gpaInputs');
    const newRow = document.createElement('div');
    newRow.className = 'gpa-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Course Name">
        <input type="number" placeholder="Credit Hours">
        <select>
            <option value="4">A</option>
            <option value="3.7">A-</option>
            <option value="3.3">B+</option>
            <option value="3">B</option>
            <option value="2.7">B-</option>
            <option value="2.3">C+</option>
            <option value="2">C</option>
            <option value="1.7">C-</option>
            <option value="1.3">D+</option>
            <option value="1">D</option>
            <option value="0">F</option>
        </select>
    `;
    gpaInputs.appendChild(newRow);
}

function calculateGPA() {
    const rows = document.querySelectorAll('.gpa-row');
    let totalPoints = 0;
    let totalCredits = 0;
    
    rows.forEach(row => {
        const creditHours = parseFloat(row.querySelector('input[type="number"]').value);
        const gradeValue = parseFloat(row.querySelector('select').value);
        
        if (!isNaN(creditHours) && !isNaN(gradeValue)) {
            totalPoints += creditHours * gradeValue;
            totalCredits += creditHours;
        }
    });
    
    if (totalCredits === 0) {
        document.getElementById('gpaResult').innerHTML = 'Please enter valid course information';
        return;
    }
    
    const gpa = totalPoints / totalCredits;
    document.getElementById('gpaResult').innerHTML = `GPA: ${gpa.toFixed(2)}`;
}

// Health Calculator (BMI)
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    
    if (isNaN(weight) || isNaN(height)) {
        document.getElementById('healthResult').innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    
    document.getElementById('healthResult').innerHTML = `
        BMI: ${bmi.toFixed(1)}<br>
        Category: ${category}
    `;
}

// Loan Calculator
function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseFloat(document.getElementById('loanTerm').value);
    
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
        document.getElementById('loanResult').innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
    
    document.getElementById('loanResult').innerHTML = `
        Monthly Payment: $${monthlyPayment.toFixed(2)}<br>
        Total Payment: $${totalPayment.toFixed(2)}<br>
        Total Interest: $${totalInterest.toFixed(2)}
    `;
}

// Keyboard support for basic calculator
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9]/.test(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLastChar();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

// Theme Management
function changeTheme() {
    const themeSelector = document.getElementById('themeSelector');
    const selectedTheme = themeSelector.value;
    
    if (selectedTheme === 'system') {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    } else {
        document.documentElement.setAttribute('data-theme', selectedTheme);
    }
    
    // Save theme preference
    localStorage.setItem('calculator-theme', selectedTheme);
}

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('calculator-theme') || 'dark';
    const themeSelector = document.getElementById('themeSelector');
    themeSelector.value = savedTheme;
    changeTheme();
}

// Listen for system theme changes
if (window.matchMedia) {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addListener((e) => {
        if (document.getElementById('themeSelector').value === 'system') {
            changeTheme();
        }
    });
}

// Call initializeTheme when the page loads
document.addEventListener('DOMContentLoaded', initializeTheme); 