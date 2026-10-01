const defaultJobs = [
  {
    title: 'SSC CGL 2026 Recruitment',
    category: 'SSC',
    dept: 'Staff Selection Commission',
    description: 'Government vacancies for Group B and C posts across central ministries.',
    deadline: 'Apply before 25 Aug',
    link: 'https://www.google.com/search?q=SSC+CGL+2026+apply+online'
  },
  {
    title: 'Indian Railways NTPC',
    category: 'Railway',
    dept: 'Ministry of Railways',
    description: 'Latest non-technical popular category recruitment with online form.',
    deadline: 'Apply before 30 Aug',
    link: 'https://www.google.com/search?q=Indian+Railways+NTPC+apply+online'
  },
  {
    title: 'IBPS PO 2026',
    category: 'Bank',
    dept: 'Institute of Banking Personnel Selection',
    description: 'Probationary officer openings in public sector banks nationwide.',
    deadline: 'Apply before 18 Sep',
    link: 'https://www.google.com/search?q=IBPS+PO+2026+apply+online'
  },
  {
    title: 'UPSC Civil Services',
    category: 'UPSC',
    dept: 'Union Public Service Commission',
    description: 'Public service recruitment for IAS, IPS, IFS and central services.',
    deadline: 'Prelims on 22 Sep',
    link: 'https://www.google.com/search?q=UPSC+Civil+Services+2026+application+form'
  },
  {
    title: 'Indian Army Agniveer',
    category: 'Defence',
    dept: 'Ministry of Defence',
    description: 'Short-term defence recruitment for youth with training and benefits.',
    deadline: 'Apply before 12 Sep',
    link: 'https://www.google.com/search?q=Indian+Army+Agniveer+apply+online'
  },
  {
    title: 'MPPSC State Vacancy',
    category: 'State',
    dept: 'Madhya Pradesh Public Service Commission',
    description: 'State-level recruitment including assistant and administrative postings.',
    deadline: 'Apply before 09 Sep',
    link: 'https://www.google.com/search?q=MPPSC+state+recruitment+apply+online'
  }
];

const defaultSchemes = [
  {
    title: 'PM-Kisan Samman Nidhi',
    type: 'Farmer Support',
    description: 'Installment support for eligible farmer families with annual verification.',
    link: 'https://www.google.com/search?q=PM-Kisan+Samman+Nidhi+application+form'
  },
  {
    title: 'Pradhan Mantri Awas Yojana',
    type: 'Housing',
    description: 'Affordable housing assistance for eligible rural and urban beneficiaries.',
    link: 'https://www.google.com/search?q=Pradhan+Mantri+Awas+Yojana+application+form'
  },
  {
    title: 'PM Ujjwala Yojana',
    type: 'Energy',
    description: 'LPG subsidy and refill support for women beneficiaries from eligible households.',
    link: 'https://www.google.com/search?q=PM+Ujjwala+Yojana+registration+form'
  },
  {
    title: 'Ayushman Bharat',
    type: 'Health',
    description: 'Cashless medical support and health card enrollment for eligible families.',
    link: 'https://www.google.com/search?q=Ayushman+Bharat+health+card+apply+online'
  }
];

let jobs = JSON.parse(localStorage.getItem('govJobsList') || JSON.stringify(defaultJobs));
let schemes = JSON.parse(localStorage.getItem('govSchemesList') || JSON.stringify(defaultSchemes));

const authScreen = document.getElementById('authScreen');
const appShell = document.getElementById('appShell');
const userContent = document.getElementById('userContent');
const adminDashboard = document.getElementById('adminDashboard');
const adminLoginPanel = document.getElementById('adminLoginPanel');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const sendOtpBtn = document.getElementById('sendOtpBtn');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');
const phoneInput = document.getElementById('phoneInput');
const otpInput = document.getElementById('otpInput');
const otpBox = document.getElementById('otpBox');
const logoutBtn = document.getElementById('logoutBtn');
const openAdminBtn = document.getElementById('openAdminBtn');
const backToUserBtn = document.getElementById('backToUserBtn');
const closeAdminModal = document.getElementById('closeAdminModal');
const adminLoginSubmit = document.getElementById('adminLoginSubmit');
const adminUser = document.getElementById('adminUser');
const adminPass = document.getElementById('adminPass');
const jobList = document.getElementById('jobList');
const schemeList = document.getElementById('schemeList');
const jobSearchInput = document.getElementById('jobSearchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const jobForm = document.getElementById('jobForm');
const schemeForm = document.getElementById('schemeForm');
const adminJobsList = document.getElementById('adminJobsList');
const adminSchemesList = document.getElementById('adminSchemesList');

const DEMO_OTP = '123456';
const ADMIN_USERNAME = 'admin@govjobs.com';
const ADMIN_PASSWORD = 'admin123';
let activeFilter = 'All';

function savePortalData() {
  localStorage.setItem('govJobsList', JSON.stringify(jobs));
  localStorage.setItem('govSchemesList', JSON.stringify(schemes));
}

function renderJobs() {
  const term = jobSearchInput.value.trim().toLowerCase();
  const filtered = jobs.filter((job) => {
    const matchesFilter = activeFilter === 'All' || job.category === activeFilter;
    const matchesSearch = !term || `${job.title} ${job.dept}`.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });

  if (!filtered.length) {
    jobList.innerHTML = '<div class="job-card"><h4>No jobs found</h4><p>Try another keyword or category.</p></div>';
    return;
  }

  jobList.innerHTML = filtered
    .map(
      (job) => `
        <article class="job-card">
          <div>
            <div class="job-top">
              <span class="category-tag">${job.category}</span>
              <span class="deadline">${job.deadline}</span>
            </div>
            <h4>${job.title}</h4>
            <p>${job.description}</p>
            <div class="job-meta">
              <span>${job.dept}</span>
            </div>
          </div>
          <div class="job-actions">
            <span class="deadline">Open now</span>
            <a class="link-btn" href="${job.link}" target="_blank" rel="noreferrer">Apply Now</a>
          </div>
        </article>
      `
    )
    .join('');
}

function renderSchemes() {
  schemeList.innerHTML = schemes
    .map(
      (scheme) => `
        <article class="scheme-card">
          <div>
            <span class="scheme-badge">${scheme.type}</span>
            <h4>${scheme.title}</h4>
            <p>${scheme.description}</p>
          </div>
          <a class="link-btn" href="${scheme.link}" target="_blank" rel="noreferrer">View Form</a>
        </article>
      `
    )
    .join('');
}

function renderAdminLists() {
  adminJobsList.innerHTML = jobs
    .map(
      (job, index) => `
        <div class="table-row">
          <div>
            <strong>${job.title}</strong>
            <span>${job.category} • ${job.deadline}</span>
          </div>
          <button class="delete-btn" data-job-index="${index}">Delete</button>
        </div>
      `
    )
    .join('');

  adminSchemesList.innerHTML = schemes
    .map(
      (scheme, index) => `
        <div class="table-row">
          <div>
            <strong>${scheme.title}</strong>
            <span>${scheme.type}</span>
          </div>
          <button class="delete-btn" data-scheme-index="${index}">Delete</button>
        </div>
      `
    )
    .join('');
}

function showApp() {
  authScreen.classList.add('hidden');
  appShell.classList.remove('hidden');
  if (userContent) userContent.classList.remove('hidden');
  adminDashboard.classList.add('hidden');
}

function hideApp() {
  appShell.classList.add('hidden');
  authScreen.classList.remove('hidden');
  otpBox.classList.add('hidden');
  adminLoginPanel.classList.add('hidden');
  adminDashboard.classList.add('hidden');
  if (userContent) userContent.classList.remove('hidden');
}

function openAdminLogin() {
  adminLoginPanel.classList.remove('hidden');
  adminUser.focus();
}

function closeAdminLogin() {
  adminLoginPanel.classList.add('hidden');
  adminUser.value = '';
  adminPass.value = '';
}

function showAdminDashboard() {
  userContent.classList.add('hidden');
  adminDashboard.classList.remove('hidden');
  closeAdminLogin();
  renderAdminLists();
}

function showUserDashboard() {
  userContent.classList.remove('hidden');
  adminDashboard.classList.add('hidden');
}

function checkAuthState() {
  const isLoggedIn = localStorage.getItem('govPortalAuth') === 'true';
  if (isLoggedIn) {
    showApp();
  } else {
    hideApp();
  }
}

googleLoginBtn.addEventListener('click', () => {
  const googleEmail = prompt('Enter your Google email to continue:', 'example@gmail.com');
  if (googleEmail && googleEmail.trim()) {
    localStorage.setItem('govPortalAuth', 'true');
    localStorage.setItem('govPortalUser', googleEmail.trim());
    showApp();
  }
});

sendOtpBtn.addEventListener('click', () => {
  const number = phoneInput.value.trim();

  if (!/^\d{10}$/.test(number)) {
    alert('Please enter a valid 10-digit mobile number.');
    return;
  }

  otpBox.classList.remove('hidden');
  otpInput.value = '';
  otpInput.focus();
  alert(`OTP sent to +91 ${number}. Demo OTP: ${DEMO_OTP}`);
});

verifyOtpBtn.addEventListener('click', () => {
  const enteredOtp = otpInput.value.trim();

  if (!enteredOtp) {
    alert('Please enter the OTP.');
    return;
  }

  if (enteredOtp === DEMO_OTP) {
    localStorage.setItem('govPortalAuth', 'true');
    localStorage.setItem('govPortalUser', `+91${phoneInput.value.trim()}`);
    showApp();
  } else {
    alert('Invalid OTP. Please use the demo OTP: 123456');
  }
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('govPortalAuth');
  localStorage.removeItem('govPortalUser');
  hideApp();
});

openAdminBtn.addEventListener('click', openAdminLogin);
closeAdminModal.addEventListener('click', closeAdminLogin);
backToUserBtn.addEventListener('click', showUserDashboard);

adminLoginSubmit.addEventListener('click', () => {
  const username = adminUser.value.trim();
  const password = adminPass.value.trim();

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    showAdminDashboard();
  } else {
    alert('Invalid admin credentials. Use demo admin credentials shown below.');
  }
});

jobForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newJob = {
    title: document.getElementById('jobTitle').value.trim(),
    category: document.getElementById('jobCategory').value.trim(),
    dept: document.getElementById('jobDept').value.trim(),
    description: document.getElementById('jobDescription').value.trim(),
    deadline: document.getElementById('jobDeadline').value.trim(),
    link: document.getElementById('jobLink').value.trim()
  };

  if (!newJob.title || !newJob.category || !newJob.dept || !newJob.description || !newJob.deadline || !newJob.link) {
    alert('Please fill all job details.');
    return;
  }

  jobs.unshift(newJob);
  savePortalData();
  renderJobs();
  renderAdminLists();
  jobForm.reset();
  alert('Job added successfully.');
});

schemeForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newScheme = {
    title: document.getElementById('schemeTitle').value.trim(),
    type: document.getElementById('schemeType').value.trim(),
    description: document.getElementById('schemeDescription').value.trim(),
    link: document.getElementById('schemeLink').value.trim()
  };

  if (!newScheme.title || !newScheme.type || !newScheme.description || !newScheme.link) {
    alert('Please fill all scheme details.');
    return;
  }

  schemes.unshift(newScheme);
  savePortalData();
  renderSchemes();
  renderAdminLists();
  schemeForm.reset();
  alert('Scheme added successfully.');
});

adminJobsList.addEventListener('click', (event) => {
  const target = event.target;
  if (!target.classList.contains('delete-btn')) return;
  const index = Number(target.dataset.jobIndex);
  jobs.splice(index, 1);
  savePortalData();
  renderJobs();
  renderAdminLists();
});

adminSchemesList.addEventListener('click', (event) => {
  const target = event.target;
  if (!target.classList.contains('delete-btn')) return;
  const index = Number(target.dataset.schemeIndex);
  schemes.splice(index, 1);
  savePortalData();
  renderSchemes();
  renderAdminLists();
});

jobSearchInput.addEventListener('input', renderJobs);

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.tag;
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    renderJobs();
  });
});

renderJobs();
renderSchemes();
renderAdminLists();
checkAuthState();
