document.addEventListener('DOMContentLoaded', function() {
        
    // ===== DATA SIMULASI (PENGGANTI DATABASE) =====
    const mockData = {
        user: {
            name: "Ahmad Rizki"
        },
        courses: [
            "Pilih mata kuliah",
            "Algoritma & Struktur Data",
            "Basis Data",
            "Pemrograman Web",
            "Matematika Diskrit"
        ],
        groups: [
            { id: "ASD2024", name: "Algoritma & Struktur Data", description: "Grup untuk diskusi tugas dan sharing materi kuliah algoritma", members: ["A", "Af", "SN"], online: 3, lastActivity: "13 Okt" },
            { id: "BD2024", name: "Basis Data", description: "Grup untuk praktek dan diskusi database", members: ["A", "DI", "EP"], online: 2, lastActivity: "20 Sep" },
            { id: "WEB2024", name: "Pemrograman Web", description: "Grup untuk proyek akhir web", members: ["A", "B", "C"], online: 5, lastActivity: "10 Okt" }
        ],
        tasks: [
            { type: 'group_activity', actor: "Ahmad Rizki", task: "Binary Search", group: "ASD2024", timestamp: new Date() },
            { type: 'assignment', title: "Tugas Akhir Mata Kuliah X", deadline: "25 Nov", description: "Bab 1 & 2", completed: true, date: new Date(2025, 10, 25) },
            { type: 'schedule', title: "Matematika Diskrit", time: "09:00 - 10:40", location: "Ruang A101", date: new Date(2025, 9, 16) },
            { type: 'schedule', title: "Matematika Diskrit", time: "09:00 - 10:40", location: "Ruang A101", date: new Date(2025, 9, 18) }
        ]
    };

    // ===== PENGELOLAAN STATE APLIKASI =====
    let currentPage = 'login-page';

    // ===== FUNGSI-FUNGSI RENDER =====
    
    // Fungsi untuk menampilkan halaman tertentu
    window.showPage = function(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('page-active');
        });
        document.getElementById(pageId).classList.add('page-active');
        currentPage = pageId;
        window.scrollTo(0, 0);
    };
    
    // Fungsi login (simulasi)
    window.login = function() {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('app-wrapper').style.display = 'block';
        showPage('dashboard-page');
    };

    // Fungsi untuk render kalender
    function renderCalendar() {
        const container = document.getElementById('calendar-container');
        if (!container) return;
        
        const now = new Date(2025, 9, 1); // Set to October 2025
        const monthName = now.toLocaleString('id-ID', { month: 'long' });
        const year = now.getFullYear();

        // Update header text
        const headerText = document.querySelector('#dashboard-page header p');
        if (headerText) {
            headerText.textContent = `${monthName} ${year}`;
        }
        
        let calendarHTML = `
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-lg text-gray-800">${monthName} ${year}</h3>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
                ${['Su', 'M', 'T', 'W', 'T', 'F', 'Sa'].map(day => `<div>${day}</div>`).join('')}
            </div>
            <div class="grid grid-cols-7 gap-1 text-center">
        `;
        const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();
        const startDay = new Date(year, now.getMonth(), 1).getDay();
        
        for (let i = 0; i < startDay; i++) {
            calendarHTML += `<div></div>`;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === 13; // Sesuai screenshot
            calendarHTML += `<div class="p-2 cursor-pointer rounded-full ${isToday ? 'bg-[#0E4299] text-white' : 'hover:bg-gray-100'}">${day}</div>`;
        }
        calendarHTML += `</div>`;
        container.innerHTML = calendarHTML;
    }
    
    // Fungsi untuk render daftar task
    function renderTasks() {
        const container = document.getElementById('task-list');
        if (!container) return;
        container.innerHTML = mockData.tasks.map(task => {
            if (task.type === 'group_activity') {
                return `
                <div class="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-400">
                    <p class="text-sm text-gray-500 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                        Aktivitas Grup
                    </p>
                    <p class="font-medium text-gray-800">${task.actor} membagikan tugas "${task.task}" di grup ${task.group}</p>
                    <button class="mt-2 text-sm font-semibold text-blue-600 hover:underline">Lihat Grup</button>
                </div>`;
            }
            if (task.type === 'assignment') {
                const deadlineDate = task.deadline;
                const formattedDeadline = new Date(deadlineDate).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short'
                });

                return `
                <div class="bg-white p-4 rounded-xl shadow-sm border-l-4 ${task.completed ? 'border-green-400' : 'border-red-400'}">
                     <div class="flex items-start gap-3">
                         <div class="w-8 h-8 flex-shrink-0 ${task.completed ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ${task.completed ? 'text-green-600' : 'text-red-600'}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                         </div>
                         <div>
                            <p class="font-bold text-gray-800">${task.title}</p>
                            <p class="text-sm text-gray-500">Deadline: ${formattedDeadline} &middot; ${task.description}</p>
                        </div>
                    </div>
                </div>`;
            }
            if (task.type === 'schedule') {
                return `
                <div class="bg-white p-4 rounded-xl shadow-sm border-l-4 border-orange-400">
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 flex-shrink-0 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-600" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" /></svg>
                         </div>
                         <div>
                            <p class="font-bold text-gray-800">${task.title}</p>
                            <p class="text-sm text-gray-500">Hari ini, ${task.time} &middot; ${task.location}</p>
                        </div>
                    </div>
                </div>`;
            }
        }).join('');
    }
    
    // Fungsi untuk render daftar grup
    function renderGroups() {
        const container = document.getElementById('group-list');
        if (!container) return;
        container.innerHTML = mockData.groups.map(group => `
            <div class="bg-white p-4 rounded-xl shadow-sm cursor-pointer hover:bg-gray-50 transition">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-bold text-lg text-gray-800">${group.name}</h3>
                        <p class="text-sm text-gray-500">${group.description}</p>
                    </div>
                    <span class="text-xs font-mono bg-gray-200 text-gray-600 px-2 py-1 rounded">${group.id}</span>
                </div>
                <div class="flex justify-between items-center mt-4 text-sm">
                    <div class="flex items-center text-gray-500">
                       <div class="flex -space-x-2 mr-2">
                            ${group.members.slice(0, 3).map(m => `<span class="w-6 h-6 bg-blue-200 text-blue-800 text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">${m}</span>`).join('')}
                            ${group.members.length > 3 ? `<span class="w-6 h-6 bg-gray-200 text-gray-600 text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">+${group.members.length - 3}</span>` : ''}
                       </div>
                       <span>| Aktivitas terakhir: ${group.lastActivity}</span>
                    </div>
                    <div class="flex items-center gap-1.5 text-green-600 font-semibold">
                        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                        ${group.online} online
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Fungsi untuk mengisi form tambah tugas
    function populateAddTaskForm() {
        const courseSelect = document.getElementById('task-course');
        if(courseSelect) {
            courseSelect.innerHTML = mockData.courses.map(course => `<option value="${course}">${course}</option>`).join('');
        }
        
        const groupList = document.getElementById('share-group-list');
        if(groupList) {
            groupList.innerHTML = mockData.groups.map(group => `
                <label class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <input type="checkbox" class="h-5 w-5 rounded border-gray-300 text-[#0E4299] focus:ring-[#0E4299]">
                    <span class="font-medium text-gray-700">${group.name}</span>
                    <span class="ml-auto text-xs font-mono bg-gray-200 text-gray-600 px-2 py-1 rounded">${group.id}</span>
                </label>
            `).join('');
        }
    }

    // ===== FUNGSI HANDLER =====
    
    // Fungsi untuk menangani penambahan tugas baru
    window.handleAddTask = function() {
        const title = document.getElementById('task-title').value;
        const course = document.getElementById('task-course').value;
        const description = document.getElementById('task-description').value;
        const deadline = document.getElementById('task-deadline').value;

        if (!title || !deadline) {
            alert('Judul Tugas dan Deadline tidak boleh kosong!');
            return;
        }

        const newTask = {
            type: 'assignment',
            title: title,
            deadline: deadline, // Simpan dalam format YYYY-MM-DD
            description: (course !== "Pilih mata kuliah" ? course : "") + (description ? (course !== "Pilih mata kuliah" ? ' - ' : '') + description : ''),
            completed: false,
            date: new Date(deadline)
        };

        mockData.tasks.unshift(newTask); // Tambahkan ke awal array
        
        // Reset form
        document.getElementById('task-title').value = '';
        document.getElementById('task-course').selectedIndex = 0;
        document.getElementById('task-description').value = '';
        document.getElementById('task-deadline')._flatpickr.clear();
        
        // Kembali ke dashboard dan render ulang
        renderTasks();
        showPage('dashboard-page');
    }

    // ===== INISIALISASI APLIKASI =====
    function init() {
        // Inisialisasi Flatpickr
        flatpickr("#task-deadline", {
            altInput: true,
            altFormat: "j F Y",
            dateFormat: "Y-m-d",
        });
        
        renderCalendar();
        renderTasks();
        renderGroups();
        populateAddTaskForm();
    }

    init(); // Jalankan inisialisasi
});
