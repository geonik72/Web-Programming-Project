document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const cityMap = {
        "Athens, Greece": 1,
        "Porto, Portugal": 2,
        "Lisbon, Portugal": 3,
        "London, England": 4,
        "Copenhagen, Denmark": 5,
        "Stockholm, Sweden": 6,
        "Berlin, Germany": 7,
        "Madrid, Spain": 8,
        "Barcelona, Spain": 9,
        "Rome, Italy": 10,
        "Milan, Italy": 11,
        "Paris, France": 12,
        "Budapest, Hungary": 13,
        "New York, USA": 14,
        "Chicago, USA": 15,
        "Marrakesh, Morocco": 16,
        "Cairo, Egypt": 17,
        "Tokyo, Japan": 18,
        "Larnaca, Cyprus": 19,
        "Thessaloniki, Greece": 20
    };
    
    const fromCity = document.getElementById('from').value;
    const toCity = document.getElementById('to').value;
    
    const fromCityId = cityMap[fromCity];
    const toCityId = cityMap[toCity];
    
    if (!fromCityId || !toCityId) {
        alert('Please select valid cities from the list.');
        return;
    }
    
    const form = document.getElementById('searchForm');
    form.innerHTML += `<input type="hidden" name="from" value="${fromCityId}">`;
    form.innerHTML += `<input type="hidden" name="to" value="${toCityId}">`;
    form.submit();
});
