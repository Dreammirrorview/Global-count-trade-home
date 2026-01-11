// Global Count Trading - JavaScript - Powered by SuperNinja
console.log('🥷 SuperNinja initialized - Global Count Trading Platform');

// Global Variables
let currentUser = null;
let isAdmin = false;
let currentMode = 'demo'; // 'demo' or 'real'
let users = [];
let adminBalance = 0;
let matrixPools = [];
let transactions = [];
let betSlip = [];
let messages = [];
let withdrawals = [];
let bankingHistory = [];
let consoleLogs = [];

// Console Ninja - Enhanced Console System
const ConsoleNinja = {
    log: function(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const logEntry = { timestamp, message, type };
        consoleLogs.unshift(logEntry);
        
        // Keep only last 100 logs
        if (consoleLogs.length > 100) {
            consoleLogs = consoleLogs.slice(0, 100);
        }
        
        // Update console display
        updateConsoleDisplay();
        
        // Also log to browser console
        console.log(`[${type.toUpperCase()}] ${message}`);
    },
    
    error: function(message) {
        this.log(message, 'error');
    },
    
    warn: function(message) {
        this.log(message, 'warning');
    },
    
    success: function(message) {
        this.log(message, 'success');
    }
};

// Initialize System
function initializeSystem() {
    ConsoleNinja.log('Initializing Global Count Trading System...');
    
    try {
        // Load data based on mode
        loadData();
        
        // Initialize admin account
        initializeAdmin();
        
        // Initialize demo data if needed
        if (currentMode === 'demo' && users.length === 0) {
            loadDemoData();
        }
        
        ConsoleNinja.success('System initialized successfully');
        updateSystemStatus();
        updateDebugInfo();
        
    } catch (error) {
        ConsoleNinja.error('Initialization failed: ' + error.message);
    }
}

// Data Management
function loadData() {
    const modePrefix = currentMode === 'demo' ? 'demo_' : 'real_';
    
    users = JSON.parse(localStorage.getItem(modePrefix + 'users')) || [];
    adminBalance = parseFloat(localStorage.getItem(modePrefix + 'adminBalance')) || 0;
    matrixPools = JSON.parse(localStorage.getItem(modePrefix + 'matrixPools')) || [];
    transactions = JSON.parse(localStorage.getItem(modePrefix + 'transactions')) || [];
    messages = JSON.parse(localStorage.getItem(modePrefix + 'messages')) || [];
    withdrawals = JSON.parse(localStorage.getItem(modePrefix + 'withdrawals')) || [];
    bankingHistory = JSON.parse(localStorage.getItem(modePrefix + 'bankingHistory')) || [];
    
    ConsoleNinja.log(`Loaded ${users.length} users, ${matrixPools.length} matrix pools`);
}

function saveData() {
    const modePrefix = currentMode === 'demo' ? 'demo_' : 'real_';
    
    localStorage.setItem(modePrefix + 'users', JSON.stringify(users));
    localStorage.setItem(modePrefix + 'adminBalance', adminBalance.toString());
    localStorage.setItem(modePrefix + 'matrixPools', JSON.stringify(matrixPools));
    localStorage.setItem(modePrefix + 'transactions', JSON.stringify(transactions));
    localStorage.setItem(modePrefix + 'messages', JSON.stringify(messages));
    localStorage.setItem(modePrefix + 'withdrawals', JSON.stringify(withdrawals));
    localStorage.setItem(modePrefix + 'bankingHistory', JSON.stringify(bankingHistory));
    
    ConsoleNinja.log('Data saved successfully');
}

// Initialize Admin Account
function initializeAdmin() {
    if (!localStorage.getItem('adminInitialized')) {
        const adminAccount = {
            accountNumber: '0000000000',
            password: 'admin123',
            email: 'admin@globalcounttrading.com',
            isAdmin: true,
            name: 'Administrator',
            balance: 0
        };
        localStorage.setItem('adminAccount', JSON.stringify(adminAccount));
        localStorage.setItem('adminInitialized', 'true');
        ConsoleNinja.success('Admin account initialized');
    }
}

// Demo Data Generator
function loadDemoData() {
    ConsoleNinja.log('Loading demo data...');
    
    // Create demo users
    const demoUsers = [
        { accountNumber: '1234567890', name: 'John Doe', email: 'john@example.com', phone: '08012345678', address: 'Lagos, Nigeria', password: 'demo123', balance: 0, status: 'active', contribution: 0, position: null, autoReinvest: false, transactions: [], registeredAt: new Date().toISOString() },
        { accountNumber: '2345678901', name: 'Jane Smith', email: 'jane@example.com', phone: '08023456789', address: 'Abuja, Nigeria', password: 'demo123', balance: 50000, status: 'active', contribution: 0, position: null, autoReinvest: false, transactions: [], registeredAt: new Date().toISOString() },
        { accountNumber: '3456789012', name: 'Mike Johnson', email: 'mike@example.com', phone: '08034567890', address: 'Port Harcourt, Nigeria', password: 'demo123', balance: 100000, status: 'active', contribution: 0, position: null, autoReinvest: false, transactions: [], registeredAt: new Date().toISOString() }
    ];
    
    users = demoUsers;
    adminBalance = 500000;
    matrixPools = [];
    
    saveData();
    ConsoleNinja.success('Demo data loaded successfully');
    alert('Demo data loaded! You can now login with:\n\nAccount: 1234567890\nPassword: demo123\n\nAdmin Login:\nAccount: 0000000000\nPassword: admin123\nKey: GCT2024');
}

function clearDemoData() {
    if (confirm('Are you sure you want to clear all demo data?')) {
        const modePrefix = currentMode === 'demo' ? 'demo_' : 'real_';
        localStorage.removeItem(modePrefix + 'users');
        localStorage.removeItem(modePrefix + 'adminBalance');
        localStorage.removeItem(modePrefix + 'matrixPools');
        localStorage.removeItem(modePrefix + 'transactions');
        localStorage.removeItem(modePrefix + 'messages');
        localStorage.removeItem(modePrefix + 'withdrawals');
        localStorage.removeItem(modePrefix + 'bankingHistory');
        
        loadData();
        ConsoleNinja.success('Demo data cleared');
        alert('Demo data cleared successfully!');
    }
}

// Mode Switching
function switchMode(mode) {
    ConsoleNinja.log(`Switching to ${mode} mode...`);
    
    currentMode = mode;
    
    // Update mode buttons
    document.getElementById('demo-mode-btn').classList.toggle('active', mode === 'demo');
    document.getElementById('real-mode-btn').classList.toggle('active', mode === 'real');
    
    // Update mode indicators
    document.getElementById('customer-mode').textContent = mode.toUpperCase() + ' MODE';
    document.getElementById('admin-mode').textContent = mode.toUpperCase() + ' MODE';
    
    // Reload data for new mode
    loadData();
    updateSystemStatus();
    
    ConsoleNinja.success(`Switched to ${mode} mode`);
    alert(`Switched to ${mode.toUpperCase()} mode`);
}

// Super Ninja Console Functions
function toggleSuperNinjaConsole() {
    const console = document.getElementById('super-ninja-console');
    console.classList.toggle('hidden');
    
    if (!console.classList.contains('hidden')) {
        updateConsoleDisplay();
        updateSystemStatus();
        updateDebugInfo();
    }
}

function updateConsoleDisplay() {
    const container = document.getElementById('console-logs');
    if (consoleLogs.length === 0) {
        container.innerHTML = '<p>No logs yet</p>';
        return;
    }
    
    container.innerHTML = consoleLogs.slice(0, 20).map(log => {
        const colorClass = log.type === 'error' ? 'color: var(--danger-color)' : 
                          log.type === 'warning' ? 'color: var(--warning-color)' : 
                          log.type === 'success' ? 'color: var(--success-color)' : 'color: white';
        
        return `<div style="padding: 0.5rem; border-bottom: 1px solid var(--accent-color); ${colorClass}">
            <small>${new Date(log.timestamp).toLocaleTimeString()}</small>
            <p>${log.message}</p>
        </div>`;
    }).join('');
}

function updateSystemStatus() {
    const status = document.getElementById('system-status');
    status.innerHTML = `
        <p><strong>Mode:</strong> ${currentMode.toUpperCase()}</p>
        <p><strong>Users:</strong> ${users.length}</p>
        <p><strong>Matrix Pools:</strong> ${matrixPools.length}</p>
        <p><strong>Admin Balance:</strong> ₦${adminBalance.toLocaleString()}</p>
        <p><strong>Total Transactions:</strong> ${transactions.length}</p>
        <p><strong>Pending Withdrawals:</strong> ${withdrawals.filter(w => w.status === 'pending').length}</p>
    `;
}

function updateDebugInfo() {
    const debug = document.getElementById('debug-info');
    debug.innerHTML = `
        <p><strong>Current User:</strong> ${currentUser ? currentUser.name : 'Not logged in'}</p>
        <p><strong>Is Admin:</strong> ${isAdmin}</p>
        <p><strong>Browser:</strong> ${navigator.userAgent}</p>
        <p><strong>Storage Used:</strong> ${JSON.stringify(localStorage).length / 1024} KB</p>
        <p><strong>Last Updated:</strong> ${new Date().toLocaleString()}</p>
    `;
}

function runDiagnostics() {
    ConsoleNinja.log('Running system diagnostics...');
    
    const diagnostics = {
        localStorage: typeof localStorage !== 'undefined',
        users: Array.isArray(users),
        adminBalance: typeof adminBalance === 'number',
        matrixPools: Array.isArray(matrixPools),
        currentUser: currentUser !== null
    };
    
    console.log('Diagnostics:', diagnostics);
    
    const allPassed = Object.values(diagnostics).every(v => v === true);
    
    if (allPassed) {
        ConsoleNinja.success('All diagnostics passed!');
        alert('✅ All systems operational!');
    } else {
        ConsoleNinja.error('Some diagnostics failed!');
        alert('❌ Some issues detected. Check console for details.');
    }
}

function resetSystem() {
    if (confirm('Are you sure you want to reset the entire system? This cannot be undone!')) {
        localStorage.clear();
        location.reload();
    }
}

// Page Navigation
function showPage(pageName) {
    ConsoleNinja.log(`Navigating to ${pageName} page`);
    
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageName + '-page').classList.add('active');
}

// Section Navigation (Customer Dashboard)
function showSection(sectionName) {
    ConsoleNinja.log(`Showing ${sectionName} section`);
    
    document.querySelectorAll('.dashboard-section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionName + '-section').classList.add('active');
    
    document.querySelectorAll('.sidebar .nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Load section data
    if (sectionName === 'overview') loadCustomerDashboard();
    if (sectionName === 'transactions') loadTransactions();
    if (sectionName === 'matrix') loadMatrixVisualization();
    if (sectionName === 'profile') loadProfile();
    if (sectionName === 'withdraw') loadWithdrawSection();
}

// Section Navigation (Admin Dashboard)
function showAdminSection(sectionName) {
    ConsoleNinja.log(`Showing admin ${sectionName} section`);
    
    document.querySelectorAll('.dashboard-section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionName + '-section').classList.add('active');
    
    document.querySelectorAll('.admin-sidebar .nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Load section data
    if (sectionName === 'admin-overview') loadAdminOverview();
    if (sectionName === 'users') loadUsers();
    if (sectionName === 'approvals') loadApprovals();
    if (sectionName === 'transactions') loadAdminTransactions();
    if (sectionName === 'withdrawals') loadWithdrawals();
    if (sectionName === 'messages') loadMessages();
    if (sectionName === 'matrix') loadMatrixPools();
    if (sectionName === 'betting') loadBettingStats();
    if (sectionName === 'banking') loadBankingHistory();
}

// Toggle Admin Login
function toggleAdminLogin() {
    const adminToggle = document.getElementById('admin-toggle');
    const adminGroup = document.getElementById('admin-login-group');
    
    if (adminToggle.checked) {
        adminGroup.style.display = 'block';
    } else {
        adminGroup.style.display = 'none';
    }
}

// Login Handler
function handleLogin(event) {
    event.preventDefault();
    
    ConsoleNinja.log('Login attempt...');
    
    const accountNumber = document.getElementById('login-account').value;
    const password = document.getElementById('login-password').value;
    const isAdminLogin = document.getElementById('admin-toggle').checked;
    
    if (isAdminLogin) {
        const adminKey = document.getElementById('admin-key').value;
        const adminAccount = JSON.parse(localStorage.getItem('adminAccount'));
        
        if (adminAccount && adminAccount.password === password && adminKey === 'GCT2024') {
            currentUser = adminAccount;
            isAdmin = true;
            showPage('admin-dashboard');
            loadAdminOverview();
            ConsoleNinja.success('Admin login successful');
        } else {
            ConsoleNinja.error('Invalid admin credentials');
            alert('Invalid admin credentials');
        }
    } else {
        const user = users.find(u => u.accountNumber === accountNumber && u.password === password);
        
        if (user) {
            if (user.status === 'blocked') {
                ConsoleNinja.error('Account blocked');
                alert('Your account has been blocked. Please contact support.');
                return;
            }
            
            currentUser = user;
            isAdmin = false;
            showPage('customer-dashboard');
            loadCustomerDashboard();
            ConsoleNinja.success(`User ${user.name} logged in successfully`);
        } else {
            ConsoleNinja.error('Invalid credentials');
            alert('Invalid credentials');
        }
    }
}

// Registration Handler
function handleRegister(event) {
    event.preventDefault();
    
    ConsoleNinja.log('New registration attempt...');
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const address = document.getElementById('reg-address').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        ConsoleNinja.error('Passwords do not match');
        alert('Passwords do not match!');
        return;
    }
    
    // Generate 10-digit account number
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        ConsoleNinja.error('Email already registered');
        alert('Email already registered');
        return;
    }
    
    const newUser = {
        accountNumber,
        name,
        email,
        phone,
        address,
        password,
        balance: 0, // New accounts start at 0
        status: 'pending', // pending, active, blocked
        contribution: 0,
        position: null,
        autoReinvest: false,
        passportPhoto: null,
        idDocument: null,
        registeredAt: new Date().toISOString(),
        transactions: [],
        messages: []
    };
    
    users.push(newUser);
    saveData();
    
    ConsoleNinja.success(`New user registered: ${name} (${accountNumber})`);
    alert(`Registration successful! Your account number is ${accountNumber}. Please wait for admin approval.\n\nOwner: Olawale Abdul-Ganiyu`);
    showPage('login');
}

// Logout
function logout() {
    ConsoleNinja.log(`User ${currentUser?.name} logging out...`);
    currentUser = null;
    isAdmin = false;
    showPage('landing');
}

// Load Customer Dashboard
function loadCustomerDashboard() {
    ConsoleNinja.log('Loading customer dashboard...');
    
    if (!currentUser) {
        ConsoleNinja.error('No current user');
        return;
    }
    
    // Refresh user data
    const userData = users.find(u => u.accountNumber === currentUser.accountNumber);
    if (userData) {
        currentUser = userData;
    }
    
    document.getElementById('customer-name').textContent = `Welcome, ${currentUser.name}`;
    document.getElementById('customer-balance').textContent = `₦${currentUser.balance.toLocaleString()}`;
    document.getElementById('customer-contribution').textContent = `₦${currentUser.contribution.toLocaleString()}`;
    document.getElementById('customer-position').textContent = currentUser.position ? `Position ${currentUser.position}` : 'Not in matrix';
    
    // Find user's pool
    const userPool = matrixPools.find(pool => pool.members.some(m => m.accountNumber === currentUser.accountNumber));
    if (userPool) {
        const memberIndex = userPool.members.findIndex(m => m.accountNumber === currentUser.accountNumber);
        document.getElementById('pool-progress').textContent = `${userPool.members.length}/11`;
        document.getElementById('pool-fill').style.width = `${(userPool.members.length / 11) * 100}%`;
    } else {
        document.getElementById('pool-progress').textContent = '0/11';
        document.getElementById('pool-fill').style.width = '0%';
    }
    
    loadActivityFeed();
    loadMatrixVisualization();
}

// Load Activity Feed
function loadActivityFeed() {
    const activityList = document.getElementById('activity-list');
    const userTransactions = currentUser.transactions || [];
    
    if (userTransactions.length === 0) {
        activityList.innerHTML = '<p>No recent activity</p>';
        return;
    }
    
    activityList.innerHTML = userTransactions.slice(-10).reverse().map(tx => `
        <div class="activity-item">
            <div>
                <strong>${tx.type}</strong>
                <p>${tx.description}</p>
            </div>
            <div class="timestamp">${new Date(tx.date).toLocaleString()}</div>
        </div>
    `).join('');
}

// Select Contribution
function selectContribution(amount) {
    ConsoleNinja.log(`Contribution selected: ₦${amount}`);
    
    if (!currentUser) {
        ConsoleNinja.error('No current user');
        return;
    }
    
    if (currentUser.balance < amount) {
        ConsoleNinja.error('Insufficient balance');
        alert('Insufficient balance. Please deposit funds first.');
        return;
    }
    
    if (currentUser.status !== 'active') {
        ConsoleNinja.error('Account not active');
        alert('Your account is pending approval. Please wait for admin verification.');
        return;
    }
    
    if (currentUser.position !== null) {
        ConsoleNinja.error('Already in matrix');
        alert('You already have an active contribution. Wait for the current cycle to complete.');
        return;
    }
    
    if (confirm(`Are you sure you want to contribute ₦${amount.toLocaleString()} to the matrix?`)) {
        joinMatrix(amount);
    }
}

// Join Matrix
function joinMatrix(amount) {
    ConsoleNinja.log(`Joining matrix with ₦${amount}`);
    
    // Deduct contribution from balance
    currentUser.balance -= amount;
    currentUser.contribution = amount;
    
    // Find or create a pool
    let pool = matrixPools.find(p => p.members.length < 11 && p.status === 'active');
    
    if (!pool) {
        pool = {
            id: Date.now(),
            members: [],
            status: 'active',
            createdAt: new Date().toISOString()
        };
        matrixPools.push(pool);
    }
    
    // Add user to pool
    const position = pool.members.length + 1;
    currentUser.position = position;
    pool.members.push({
        accountNumber: currentUser.accountNumber,
        name: currentUser.name,
        contribution: amount,
        position: position,
        joinedAt: new Date().toISOString()
    });
    
    ConsoleNinja.log(`User added to position ${position} in pool ${pool.id}`);
    
    // Add 11th person's money to admin balance
    if (pool.members.length === 11) {
        ConsoleNinja.log('Pool full! Processing payout...');
        const lastMember = pool.members[pool.members.length - 1];
        adminBalance += lastMember.contribution;
        
        // Process payout for first member
        processPayout(pool);
        
        // Rotate matrix
        rotateMatrix(pool);
    }
    
    // Save data
    saveUserData();
    saveData();
    
    // Add transaction
    addTransaction('contribution', `Contributed ₦${amount.toLocaleString()} to matrix`, amount);
    
    // Send notification
    sendNotification(currentUser.email, currentUser.phone, `You have successfully contributed ₦${amount.toLocaleString()} to Global Count Trading - Owned by Olawale Abdul-Ganiyu`);
    
    ConsoleNinja.success('Contribution successful');
    alert('Contribution successful! You have been added to the matrix.');
    loadCustomerDashboard();
}

// Process Payout
function processPayout(pool) {
    const firstMember = pool.members[0];
    const user = users.find(u => u.accountNumber === firstMember.accountNumber);
    
    if (user) {
        // Calculate charges (10% breakdown)
        const totalContribution = pool.members.slice(0, 10).reduce((sum, m) => sum + m.contribution, 0);
        const charges = calculateCharges(totalContribution);
        const payout = totalContribution - charges.total;
        
        ConsoleNinja.log(`Processing payout for ${user.name}: ₦${payout.toLocaleString()}`);
        
        // Credit charges to admin balance
        adminBalance += charges.total;
        
        // Credit payout to user
        user.balance += payout;
        user.contribution = 0;
        user.position = null;
        
        // Add transactions
        addTransactionToUser(user, 'payout', `Received payout: ₦${payout.toLocaleString()}`, payout);
        
        // Send detailed notification
        const chargeDetails = `
Monitoring Fee: ₦5,000
Web Maintenance: ₦1,000
Administrative: ₦1,000
Current Account: ₦1,000
Transactions: ₦1,000
Robot: ₦500
VAT: ₦1,000
Total Charges: ₦${charges.total.toLocaleString()}
        `.trim();
        
        sendNotification(user.email, user.phone, 
            `Successful received pay from Global Count Trading - Owned by Olawale Abdul-Ganiyu\nAmount: ₦${payout.toLocaleString()}\n\nCharges Breakdown:\n${chargeDetails}\n\nNew Balance: ₦${user.balance.toLocaleString()}`
        );
        
        ConsoleNinja.success(`Payout processed for ${user.name}`);
    }
}

// Calculate Charges
function calculateCharges(amount) {
    return {
        monitoringFee: 5000,
        webMaintenance: 1000,
        administrative: 1000,
        currentAccount: 1000,
        transactions: 1000,
        robot: 500,
        vat: 1000,
        total: 10500
    };
}

// Rotate Matrix
function rotateMatrix(pool) {
    ConsoleNinja.log('Rotating matrix...');
    
    // Remove first member
    const firstMember = pool.members.shift();
    
    // Update positions
    pool.members.forEach((member, index) => {
        member.position = index + 1;
    });
    
    // Update user objects
    pool.members.forEach(member => {
        const user = users.find(u => u.accountNumber === member.accountNumber);
        if (user) {
            user.position = member.position;
        }
    });
    
    saveData();
    ConsoleNinja.success('Matrix rotated');
}

// Load Matrix Visualization
function loadMatrixVisualization() {
    const container = document.getElementById('matrix-positions');
    
    if (!currentUser) {
        container.innerHTML = '<p>Please login to view matrix positions</p>';
        return;
    }
    
    const userPool = matrixPools.find(pool => pool.members.some(m => m.accountNumber === currentUser.accountNumber));
    
    if (!userPool) {
        container.innerHTML = '<p>You are not currently in any matrix pool</p>';
        return;
    }
    
    let html = '';
    for (let i = 1; i <= 11; i++) {
        const member = userPool.members.find(m => m.position === i);
        const isCurrentUser = member && member.accountNumber === currentUser.accountNumber;
        
        html += `
            <div class="matrix-position ${member ? 'filled' : ''} ${isCurrentUser ? 'current' : ''}">
                <strong>${i}</strong>
                ${member ? `<p>${member.name}</p>` : '<p>Empty</p>'}
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Deposit Handler
function handleDeposit(event) {
    event.preventDefault();
    
    ConsoleNinja.log('Deposit request received...');
    
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    const method = document.querySelector('.method-btn.active').textContent.toLowerCase();
    
    if (!amount || amount < 1000) {
        ConsoleNinja.error('Invalid deposit amount');
        alert('Minimum deposit is ₦1,000');
        return;
    }
    
    ConsoleNinja.log(`Processing deposit: ₦${amount.toLocaleString()} via ${method}`);
    
    // In demo mode, auto-approve deposits
    if (currentMode === 'demo') {
        currentUser.balance += amount;
        addTransaction('deposit', `Deposit of ₦${amount.toLocaleString()} via ${method}`, amount);
        saveUserData();
        loadCustomerDashboard();
        
        ConsoleNinja.success('Deposit approved (Demo Mode)');
        alert(`Deposit of ₦${amount.toLocaleString()} successful! (Demo Mode)`);
    } else {
        // In real mode, create pending transaction
        alert(`Deposit request of ₦${amount.toLocaleString()} via ${method} submitted. Please wait for admin verification.`);
    }
}

// Withdraw Section Loader
function loadWithdrawSection() {
    if (currentUser) {
        document.getElementById('withdraw-balance').textContent = `₦${currentUser.balance.toLocaleString()}`;
    }
}

// Withdraw Handler
function handleWithdraw(event) {
    event.preventDefault();
    
    ConsoleNinja.log('Withdrawal request received...');
    
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    const bank = document.getElementById('withdraw-bank').value;
    const accountNumber = document.getElementById('withdraw-account').value;
    const accountName = document.getElementById('withdraw-account-name').value;
    
    if (amount < 1000) {
        ConsoleNinja.error('Invalid withdrawal amount');
        alert('Minimum withdrawal is ₦1,000');
        return;
    }
    
    if (currentUser.balance < amount) {
        ConsoleNinja.error('Insufficient balance');
        alert('Insufficient balance');
        return;
    }
    
    if (currentUser.contribution > 0 && currentUser.balance - amount < 1000) {
        ConsoleNinja.error('Minimum balance requirement');
        alert('Cannot withdraw. Minimum balance must be ₦1,000 when you have an active contribution.');
        return;
    }
    
    // Create withdrawal request
    const withdrawal = {
        id: Date.now(),
        accountNumber: currentUser.accountNumber,
        name: currentUser.name,
        amount,
        bank,
        accountNumber: accountNumber,
        accountName: accountName,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    withdrawals.push(withdrawal);
    saveData();
    
    addTransaction('withdrawal', `Withdrawal request: ₦${amount.toLocaleString()}`, amount);
    
    ConsoleNinja.success(`Withdrawal request created: ₦${amount.toLocaleString()}`);
    alert(`Withdrawal request of ₦${amount.toLocaleString()} submitted. Please wait for processing.`);
}

// Manual Reinvest
function manualReinvest() {
    ConsoleNinja.log('Manual reinvest requested...');
    
    if (!currentUser) {
        return;
    }
    
    if (currentUser.balance < currentUser.contribution) {
        ConsoleNinja.error('Insufficient balance to reinvest');
        alert('Insufficient balance to reinvest');
        return;
    }
    
    if (confirm('Do you want to reinvest ₦' + currentUser.contribution.toLocaleString() + '?')) {
        joinMatrix(currentUser.contribution);
    }
}

// Toggle Auto Reinvest
function toggleAutoReinvest() {
    const autoReinvest = document.getElementById('auto-reinvest').checked;
    currentUser.autoReinvest = autoReinvest;
    saveUserData();
    ConsoleNinja.log(`Auto-reinvest ${autoReinvest ? 'enabled' : 'disabled'}`);
}

// Betting Functions
function addBet(selection, odds) {
    betSlip.push({ selection, odds });
    updateBetSlip();
    ConsoleNinja.log(`Added bet: ${selection} @ ${odds}`);
}

function updateBetSlip() {
    const container = document.getElementById('bet-slip-items');
    
    if (betSlip.length === 0) {
        container.innerHTML = '<p>No bets selected</p>';
        return;
    }
    
    container.innerHTML = betSlip.map((bet, index) => `
        <div class="bet-item">
            <p>${bet.selection} @ ${bet.odds}</p>
            <button onclick="removeBet(${index})">Remove</button>
        </div>
    `).join('');
}

function removeBet(index) {
    betSlip.splice(index, 1);
    updateBetSlip();
    ConsoleNinja.log(`Removed bet at index ${index}`);
}

function placeBet() {
    const amount = parseFloat(document.getElementById('bet-amount').value);
    
    if (amount > currentUser.balance) {
        ConsoleNinja.error('Insufficient balance for bet');
        alert('Insufficient balance');
        return;
    }
    
    if (betSlip.length === 0) {
        ConsoleNinja.error('No bets selected');
        alert('Please add selections to bet slip');
        return;
    }
    
    // Calculate potential win
    const totalOdds = betSlip.reduce((product, bet) => product * bet.odds, 1);
    const potentialWin = amount * totalOdds;
    
    currentUser.balance -= amount;
    
    addTransaction('bet', `Bet placed: ₦${amount.toLocaleString()} (Potential win: ₦${potentialWin.toLocaleString()})`, amount);
    
    ConsoleNinja.success(`Bet placed: ₦${amount.toLocaleString()}`);
    alert(`Bet placed successfully! Potential win: ₦${potentialWin.toLocaleString()}`);
    
    betSlip = [];
    updateBetSlip();
    loadCustomerDashboard();
}

// Casino Games (Simulated)
function playSlot() {
    ConsoleNinja.log('Slot machine game opened');
    alert('🎰 Slot machine game would open here');
}

function playRoulette() {
    ConsoleNinja.log('Roulette game opened');
    alert('🎡 Roulette game would open here');
}

function playBlackjack() {
    ConsoleNinja.log('Blackjack game opened');
    alert('🃏 Blackjack game would open here');
}

function playPoker() {
    ConsoleNinja.log('Poker game opened');
    alert('♠️ Poker game would open here');
}

// Load Transactions
function loadTransactions() {
    const container = document.getElementById('transactions-container');
    const userTransactions = currentUser.transactions || [];
    
    if (userTransactions.length === 0) {
        container.innerHTML = '<p>No transactions yet</p>';
        return;
    }
    
    container.innerHTML = userTransactions.slice().reverse().map(tx => `
        <div class="transaction-item ${tx.type}">
            <div>
                <strong>${tx.type.toUpperCase()}</strong>
                <p>${tx.description}</p>
            </div>
            <div>
                <p class="amount">₦${tx.amount.toLocaleString()}</p>
                <small>${new Date(tx.date).toLocaleString()}</small>
            </div>
        </div>
    `).join('');
}

// Filter Transactions
function filterTransactions() {
    const filter = document.getElementById('transaction-filter').value;
    const container = document.getElementById('transactions-container');
    
    let filtered = currentUser.transactions || [];
    
    if (filter !== 'all') {
        filtered = (currentUser.transactions || []).filter(tx => tx.type === filter);
    }
    
    if (filtered.length === 0) {
        container.innerHTML = '<p>No transactions found</p>';
        return;
    }
    
    container.innerHTML = filtered.slice().reverse().map(tx => `
        <div class="transaction-item ${tx.type}">
            <div>
                <strong>${tx.type.toUpperCase()}</strong>
                <p>${tx.description}</p>
            </div>
            <div>
                <p class="amount">₦${tx.amount.toLocaleString()}</p>
                <small>${new Date(tx.date).toLocaleString()}</small>
            </div>
        </div>
    `).join('');
}

// Load Profile
function loadProfile() {
    if (!currentUser) {
        return;
    }
    
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-account').textContent = currentUser.accountNumber;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-phone').textContent = currentUser.phone;
    document.getElementById('profile-address').textContent = currentUser.address;
    document.getElementById('profile-status').textContent = currentUser.status.toUpperCase();
}

// Update Profile
function updateProfile(event) {
    event.preventDefault();
    
    const newPassword = document.getElementById('new-password').value;
    const newPhone = document.getElementById('update-phone').value;
    
    if (newPassword) {
        currentUser.password = newPassword;
        ConsoleNinja.log('Password updated');
    }
    
    if (newPhone) {
        currentUser.phone = newPhone;
        ConsoleNinja.log('Phone updated');
    }
    
    saveUserData();
    loadProfile();
    
    alert('Profile updated successfully');
    ConsoleNinja.success('Profile updated');
}

// Admin Functions
function loadAdminOverview() {
    ConsoleNinja.log('Loading admin overview...');
    
    document.getElementById('total-users').textContent = users.length;
    document.getElementById('admin-balance').textContent = `₦${adminBalance.toLocaleString()}`;
    
    const pendingApprovals = users.filter(u => u.status === 'pending').length;
    document.getElementById('pending-approvals').textContent = pendingApprovals;
    
    const activePools = matrixPools.filter(p => p.status === 'active').length;
    document.getElementById('active-pools').textContent = activePools;
    
    loadAdminActivity();
}

function loadAdminActivity() {
    const container = document.getElementById('admin-activity-list');
    const recentTransactions = transactions.slice(-10).reverse();
    
    if (recentTransactions.length === 0) {
        container.innerHTML = '<p>No recent activity</p>';
        return;
    }
    
    container.innerHTML = recentTransactions.map(tx => `
        <div class="activity-item">
            <div>
                <strong>${tx.type}</strong>
                <p>${tx.description}</p>
            </div>
            <div class="timestamp">${new Date(tx.date).toLocaleString()}</div>
        </div>
    `).join('');
}

function loadUsers() {
    ConsoleNinja.log('Loading users...');
    
    const container = document.getElementById('users-list');
    
    if (users.length === 0) {
        container.innerHTML = '<p>No users found</p>';
        return;
    }
    
    container.innerHTML = users.map(user => `
        <div class="user-card">
            <div>
                <strong>${user.name}</strong>
                <p>Account: ${user.accountNumber}</p>
                <p>Email: ${user.email}</p>
                <p>Balance: ₦${user.balance.toLocaleString()}</p>
                <p>Status: <span style="color: ${user.status === 'active' ? 'green' : user.status === 'blocked' ? 'red' : 'orange'}">${user.status}</span></p>
            </div>
            <div class="user-actions">
                <button class="btn-edit" onclick="editUser('${user.accountNumber}')">Edit Balance</button>
                ${user.status === 'active' ? `<button class="btn-block" onclick="blockUser('${user.accountNumber}')">Block</button>` : ''}
                ${user.status === 'blocked' ? `<button class="btn-approve" onclick="unblockUser('${user.accountNumber}')">Unblock</button>` : ''}
            </div>
        </div>
    `).join('');
}

function editUser(accountNumber) {
    const user = users.find(u => u.accountNumber === accountNumber);
    if (user) {
        const newBalance = prompt(`Current balance: ₦${user.balance.toLocaleString()}\nEnter new balance (add $5 bonus option):`, user.balance);
        
        if (newBalance !== null) {
            user.balance = parseFloat(newBalance);
            saveData();
            loadUsers();
            
            ConsoleNinja.success(`User ${user.name} balance updated to ₦${user.balance.toLocaleString()}`);
            alert(`Balance updated to ₦${user.balance.toLocaleString()}`);
        }
    }
}

function blockUser(accountNumber) {
    const user = users.find(u => u.accountNumber === accountNumber);
    if (user) {
        user.status = 'blocked';
        saveData();
        loadUsers();
        
        ConsoleNinja.log(`User ${user.name} blocked`);
        alert(`${user.name} has been blocked`);
    }
}

function unblockUser(accountNumber) {
    const user = users.find(u => u.accountNumber === accountNumber);
    if (user) {
        user.status = 'active';
        saveData();
        loadUsers();
        
        ConsoleNinja.log(`User ${user.name} unblocked`);
        alert(`${user.name} has been unblocked`);
    }
}

function loadApprovals() {
    ConsoleNinja.log('Loading pending approvals...');
    
    const container = document.getElementById('approvals-list');
    const pendingUsers = users.filter(u => u.status === 'pending');
    
    if (pendingUsers.length === 0) {
        container.innerHTML = '<p>No pending approvals</p>';
        return;
    }
    
    container.innerHTML = pendingUsers.map(user => `
        <div class="user-card">
            <div>
                <strong>${user.name}</strong>
                <p>Account: ${user.accountNumber}</p>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <p>Address: ${user.address}</p>
            </div>
            <div class="user-actions">
                <button class="btn-approve" onclick="approveUser('${user.accountNumber}')">Approve</button>
                <button class="btn-block" onclick="rejectUser('${user.accountNumber}')">Reject</button>
            </div>
        </div>
    `).join('');
}

function approveUser(accountNumber) {
    const user = users.find(u => u.accountNumber === accountNumber);
    if (user) {
        user.status = 'active';
        saveData();
        loadApprovals();
        
        ConsoleNinja.success(`User ${user.name} approved`);
        alert(`${user.name} has been approved`);
    }
}

function rejectUser(accountNumber) {
    if (confirm('Are you sure you want to reject this user?')) {
        users = users.filter(u => u.accountNumber !== accountNumber);
        saveData();
        loadApprovals();
        
        ConsoleNinja.log(`User rejected: ${accountNumber}`);
    }
}

function loadWithdrawals() {
    ConsoleNinja.log('Loading withdrawal requests...');
    
    const container = document.getElementById('withdrawals-list');
    
    if (withdrawals.length === 0) {
        container.innerHTML = '<p>No withdrawal requests</p>';
        return;
    }
    
    container.innerHTML = withdrawals.map(w => `
        <div class="withdrawal-item ${w.status}">
            <div>
                <strong>${w.name}</strong>
                <p>Account: ${w.accountNumber}</p>
                <p>Bank: ${w.bank} - ${w.accountName}</p>
                <p>Amount: ₦${w.amount.toLocaleString()}</p>
            </div>
            <div class="user-actions">
                ${w.status === 'pending' ? `
                    <button class="btn-approve" onclick="approveWithdrawal(${w.id})">Approve</button>
                    <button class="btn-block" onclick="rejectWithdrawal(${w.id})">Reject</button>
                ` : ''}
                <p>Status: ${w.status}</p>
            </div>
        </div>
    `).join('');
}

function approveWithdrawal(id) {
    const withdrawal = withdrawals.find(w => w.id === id);
    
    if (withdrawal) {
        const user = users.find(u => u.accountNumber === withdrawal.accountNumber);
        
        if (user && user.balance >= withdrawal.amount) {
            user.balance -= withdrawal.amount;
            withdrawal.status = 'approved';
            
            saveData();
            
            sendNotification(user.email, user.phone, `Your withdrawal of ₦${withdrawal.amount.toLocaleString()} has been approved`);
            
            loadWithdrawals();
            
            ConsoleNinja.success(`Withdrawal approved: ₦${withdrawal.amount.toLocaleString()}`);
            alert('Withdrawal approved');
        } else {
            ConsoleNinja.error('Insufficient user balance');
            alert('Insufficient user balance');
        }
    }
}

function rejectWithdrawal(id) {
    const withdrawal = withdrawals.find(w => w.id === id);
    
    if (withdrawal) {
        withdrawal.status = 'rejected';
        saveData();
        
        const user = users.find(u => u.accountNumber === withdrawal.accountNumber);
        if (user) {
            sendNotification(user.email, user.phone, `Your withdrawal of ₦${withdrawal.amount.toLocaleString()} has been rejected`);
        }
        
        loadWithdrawals();
        
        ConsoleNinja.log(`Withdrawal rejected: ${id}`);
        alert('Withdrawal rejected');
    }
}

function loadMessages() {
    ConsoleNinja.log('Loading messages...');
    
    const container = document.getElementById('messages-list');
    
    if (messages.length === 0) {
        container.innerHTML = '<p>No messages</p>';
        return;
    }
    
    container.innerHTML = messages.map(msg => `
        <div class="message-item">
            <h4>${msg.name}</h4>
            <p class="message-meta">${msg.email} | ${msg.phone}</p>
            <p>${msg.message}</p>
            <small>${new Date(msg.date).toLocaleString()}</small>
        </div>
    `).join('');
}

function replyToMessage(event) {
    event.preventDefault();
    
    const replyTo = document.getElementById('reply-to').value;
    const replyMessage = document.getElementById('reply-message').value;
    
    ConsoleNinja.log(`Reply sent to ${replyTo}`);
    alert('Reply sent successfully!');
    
    document.getElementById('reply-message').value = '';
}

function loadMatrixPools() {
    ConsoleNinja.log('Loading matrix pools...');
    
    const container = document.getElementById('matrix-pools-list');
    
    if (matrixPools.length === 0) {
        container.innerHTML = '<p>No active matrix pools</p>';
        return;
    }
    
    container.innerHTML = matrixPools.map(pool => `
        <div class="matrix-pool">
            <h3>Pool #${pool.id}</h3>
            <p>Members: ${pool.members.length}/11</p>
            <p>Status: ${pool.status}</p>
            <div class="matrix-visualization">
                ${pool.members.map(member => `
                    <div class="matrix-position filled">
                        <strong>${member.position}</strong>
                        <p>${member.name}</p>
                        <p>₦${member.contribution.toLocaleString()}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function loadBettingStats() {
    ConsoleNinja.log('Loading betting stats...');
    
    const container = document.getElementById('betting-stats');
    const allBets = users.reduce((all, user) => {
        const userBets = (user.transactions || []).filter(tx => tx.type === 'bet');
        return [...all, ...userBets];
    }, []);
    
    container.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Bets</h3>
                <p>${allBets.length}</p>
            </div>
            <div class="stat-card">
                <h3>Total Bet Amount</h3>
                <p>₦${allBets.reduce((sum, bet) => sum + bet.amount, 0).toLocaleString()}</p>
            </div>
        </div>
    `;
}

function loadAdminTransactions() {
    ConsoleNinja.log('Loading admin transactions...');
    
    const container = document.getElementById('admin-transactions-container');
    const allTransactions = transactions;
    
    if (allTransactions.length === 0) {
        container.innerHTML = '<p>No transactions yet</p>';
        return;
    }
    
    container.innerHTML = allTransactions.slice().reverse().map(tx => `
        <div class="transaction-item ${tx.type}">
            <div>
                <strong>${tx.type.toUpperCase()}</strong>
                <p>${tx.description}</p>
                <p>User: ${tx.userAccountNumber || 'Admin'}</p>
            </div>
            <div>
                <p class="amount">₦${tx.amount.toLocaleString()}</p>
                <small>${new Date(tx.date).toLocaleString()}</small>
            </div>
        </div>
    `).join('');
}

function filterAdminTransactions() {
    const filter = document.getElementById('admin-transaction-filter').value;
    const container = document.getElementById('admin-transactions-container');
    
    let filtered = transactions;
    
    if (filter !== 'all') {
        filtered = transactions.filter(tx => tx.type === filter);
    }
    
    container.innerHTML = filtered.slice().reverse().map(tx => `
        <div class="transaction-item ${tx.type}">
            <div>
                <strong>${tx.type.toUpperCase()}</strong>
                <p>${tx.description}</p>
                <p>User: ${tx.userAccountNumber || 'Admin'}</p>
            </div>
            <div>
                <p class="amount">₦${tx.amount.toLocaleString()}</p>
                <small>${new Date(tx.date).toLocaleString()}</small>
            </div>
        </div>
    `).join('');
}

// Admin Banking
function handleAdminSend(event) {
    event.preventDefault();
    
    ConsoleNinja.log('Admin sending money...');
    
    const bankName = document.getElementById('send-bank-name').value;
    const accountNum = document.getElementById('send-account-num').value;
    const accountName = document.getElementById('send-account-name').value;
    const amount = parseFloat(document.getElementById('send-amount').value);
    const phone = document.getElementById('send-phone').value;
    const transferType = document.getElementById('transfer-type').value;
    
    if (adminBalance < amount) {
        ConsoleNinja.error('Insufficient admin balance');
        alert('Insufficient admin balance');
        return;
    }
    
    adminBalance -= amount;
    
    // Add to banking history
    bankingHistory.push({
        id: Date.now(),
        type: 'send',
        bankName,
        accountNumber: accountNum,
        accountName,
        amount,
        phone,
        transferType,
        date: new Date().toISOString()
    });
    
    saveData();
    
    ConsoleNinja.success(`Transfer of ₦${amount.toLocaleString()} completed`);
    alert(`Transfer of ₦${amount.toLocaleString()} to ${accountName} (${bankName}) completed successfully`);
}

function toggleSwiftDetails() {
    const transferType = document.getElementById('transfer-type').value;
    const swiftDetails = document.getElementById('swift-details');
    
    if (transferType === 'swift' || transferType === 'international') {
        swiftDetails.style.display = 'block';
    } else {
        swiftDetails.style.display = 'none';
    }
}

function showBankingTab(tab) {
    document.querySelectorAll('.banking-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tab + '-money-tab').classList.add('active');
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function loadBankingHistory() {
    ConsoleNinja.log('Loading banking history...');
    
    const container = document.getElementById('banking-history-list');
    
    if (bankingHistory.length === 0) {
        container.innerHTML = '<p>No banking history</p>';
        return;
    }
    
    container.innerHTML = bankingHistory.map(bank => `
        <div class="transaction-item">
            <div>
                <strong>${bank.type.toUpperCase()}</strong>
                <p>${bank.bankName} - ${bank.accountName}</p>
                <p>Type: ${bank.transferType}</p>
            </div>
            <div>
                <p class="amount">₦${bank.amount.toLocaleString()}</p>
                <small>${new Date(bank.date).toLocaleString()}</small>
            </div>
        </div>
    `).join('');
}

// Search and Filter Users
function searchUsers() {
    const searchTerm = document.getElementById('user-search').value.toLowerCase();
    const container = document.getElementById('users-list');
    
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.accountNumber.includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    
    if (filteredUsers.length === 0) {
        container.innerHTML = '<p>No users found</p>';
        return;
    }
    
    container.innerHTML = filteredUsers.map(user => `
        <div class="user-card">
            <div>
                <strong>${user.name}</strong>
                <p>Account: ${user.accountNumber}</p>
                <p>Email: ${user.email}</p>
                <p>Balance: ₦${user.balance.toLocaleString()}</p>
                <p>Status: ${user.status}</p>
            </div>
            <div class="user-actions">
                <button class="btn-edit" onclick="editUser('${user.accountNumber}')">Edit Balance</button>
            </div>
        </div>
    `).join('');
}

function filterUsers() {
    const status = document.getElementById('user-status-filter').value;
    const container = document.getElementById('users-list');
    
    let filteredUsers = users;
    
    if (status !== 'all') {
        filteredUsers = users.filter(user => user.status === status);
    }
    
    if (filteredUsers.length === 0) {
        container.innerHTML = '<p>No users found</p>';
        return;
    }
    
    container.innerHTML = filteredUsers.map(user => `
        <div class="user-card">
            <div>
                <strong>${user.name}</strong>
                <p>Account: ${user.accountNumber}</p>
                <p>Email: ${user.email}</p>
                <p>Balance: ₦${user.balance.toLocaleString()}</p>
                <p>Status: ${user.status}</p>
            </div>
            <div class="user-actions">
                <button class="btn-edit" onclick="editUser('${user.accountNumber}')">Edit Balance</button>
            </div>
        </div>
    `).join('');
}

// Helper Functions
function addTransaction(type, description, amount) {
    if (!currentUser) return;
    
    const transaction = {
        id: Date.now(),
        type,
        description,
        amount,
        date: new Date().toISOString(),
        userAccountNumber: currentUser.accountNumber
    };
    
    if (!currentUser.transactions) {
        currentUser.transactions = [];
    }
    
    currentUser.transactions.push(transaction);
    
    // Also add to global transactions
    transactions.push(transaction);
    
    saveUserData();
    saveData();
    
    ConsoleNinja.log(`Transaction added: ${type} - ₦${amount.toLocaleString()}`);
}

function addTransactionToUser(user, type, description, amount) {
    const transaction = {
        id: Date.now(),
        type,
        description,
        amount,
        date: new Date().toISOString(),
        userAccountNumber: user.accountNumber
    };
    
    if (!user.transactions) {
        user.transactions = [];
    }
    
    user.transactions.push(transaction);
    
    // Also add to global transactions
    transactions.push(transaction);
    
    ConsoleNinja.log(`Transaction added for ${user.name}: ${type} - ₦${amount.toLocaleString()}`);
}

function saveUserData() {
    if (!currentUser) return;
    
    const userIndex = users.findIndex(u => u.accountNumber === currentUser.accountNumber);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        saveData();
    }
}

function sendNotification(email, phone, message) {
    ConsoleNinja.log(`Notification sent to ${email} / ${phone}`);
    
    // In production, this would send actual emails/SMS
    const notification = {
        email,
        phone,
        message,
        date: new Date().toISOString()
    };
    
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.push(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

// Deposit Method Selection
function selectDepositMethod(method) {
    ConsoleNinja.log(`Deposit method selected: ${method}`);
    
    document.querySelectorAll('.method-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.payment-details').forEach(detail => detail.style.display = 'none');
    document.getElementById(method + '-details').style.display = 'block';
}

// Sport Selection
function selectSport(sport) {
    ConsoleNinja.log(`Sport selected: ${sport}`);
    
    document.querySelectorAll('.sport-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // In real implementation, this would load matches for the selected sport
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    ConsoleNinja.log('🚀 Global Count Trading Platform - Initializing...');
    initializeSystem();
});

// Export data function
function exportData() {
    const data = {
        users,
        adminBalance,
        matrixPools,
        transactions,
        messages,
        withdrawals,
        bankingHistory,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `global-count-trading-export-${currentMode}-${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    
    ConsoleNinja.success('Data exported successfully');
    alert('Data exported successfully!');
}