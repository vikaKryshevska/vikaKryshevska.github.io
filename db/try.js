async function fetchData() {
  try {
    const response = await fetch('http://localhost:3100/data');
    const data = await response.json();

    appendData(data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
