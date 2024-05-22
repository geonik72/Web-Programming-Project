document.addEventListener('DOMContentLoaded', function () {
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
    
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    
    fromInput.addEventListener('input', function () {
        updateToList();
    });
    
    toInput.addEventListener('input', function () {
        updateFromList();
    });
    
    function updateToList() {
        const selectedFromCity = fromInput.value;
        const toOptions = document.getElementById('destinations').options;
        
        for (let i = 0; i < toOptions.length; i++) {
            const option = toOptions[i];
            option.disabled = option.value === selectedFromCity;
        }
    }
    
    function updateFromList() {
        const selectedToCity = toInput.value;
        const fromOptions = document.getElementById('cities').options;
        
        for (let i = 0; i < fromOptions.length; i++) {
            const option = fromOptions[i];
            option.disabled = option.value === selectedToCity;
        }
    }
    
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const fromCity = fromInput.value;
        const toCity = toInput.value;
        
        const fromCityId = cityMap[fromCity];
        const toCityId = cityMap[toCity];
        
        if (!fromCityId || !toCityId) {
            alert('Please select valid cities from the list.');
            return;
        }
        
        let fromHiddenInput = document.querySelector('input[name="from"]');
        let toHiddenInput = document.querySelector('input[name="to"]');
        
        if (!fromHiddenInput) {
            fromHiddenInput = document.createElement('input');
            fromHiddenInput.type = 'hidden';
            fromHiddenInput.name = 'from';
            document.getElementById('searchForm').appendChild(fromHiddenInput);
        }
        fromHiddenInput.value = fromCityId;
        
        if (!toHiddenInput) {
            toHiddenInput = document.createElement('input');
            toHiddenInput.type = 'hidden';
            toHiddenInput.name = 'to';
            document.getElementById('searchForm').appendChild(toHiddenInput);
        }
        toHiddenInput.value = toCityId;
        
        document.getElementById('searchForm').submit();
    });
});
