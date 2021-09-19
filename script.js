// selecting required element
const results = document.querySelector('.results ul');
const pagination = document.querySelector('.pagination ul');
let totalPages;
let page;
let data = [];
let pageNo = 1;

const url = 'https://reqres.in/api/users';

const getResults = (pageNo) => {
  fetch(`${url}?page=${pageNo}`)
    .then((res) => res.json())
    .then((res) => {
      page = res.page;
      totalPages = res.total_pages;
      data = [...res.data];

      showData(page, totalPages, data);
    });
};

getResults(pageNo);

function removePagination() {
  pagination.innerHTML = '';
}

function removeResults() {
  results.innerHTML = '';
}

function showData(page, totalPages, data) {
  removePagination();
  removeResults();

  showPagination(page, totalPages);
  showResults(data);
}

function showPagination(page, totalPages) {
  const arrLeft = document.createElement('li');
  arrLeft.classList.add('btn');
  arrLeft.innerHTML = `<i class="fas fa-arrow-left"></i>`;

  arrLeft.addEventListener('click', () => {
    if (page > 1) {
      getResults(page - 1);
    }
  });

  pagination.append(arrLeft);

  const currPage = document.createElement('li');
  currPage.classList.add('curr-page');
  currPage.innerHTML = `${page}`;

  const slash = document.createElement('li');
  slash.innerHTML = '/';

  const total = document.createElement('li');
  total.classList.add('total-page');
  total.innerHTML = totalPages;

  const arrRight = document.createElement('li');
  arrRight.classList.add('btn');
  arrRight.innerHTML = `<i class="fas fa-arrow-right"></i>`;

  arrRight.addEventListener('click', () => {
    if (page < totalPages) {
      getResults(page + 1);
    }
  });

  pagination.append(currPage);
  pagination.append(slash);
  pagination.append(total);

  pagination.append(arrRight);
}

function showResults(data) {
  data.forEach((item) => {
    const l = document.createElement('li');

    l.innerHTML = `
      <div class="item">
        <img src=${item.avatar} alt="avatar" />
        <div class="info">
          <p><b>Email: </b>${item.email}</p>
          <p><b>First name: </b>${item.first_name}</p>
          <p><b>Last name: </b>${item.last_name}</p>
        </div>
      </div>
    `;

    results.append(l);
  });
}
