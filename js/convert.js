window.addEventListener('load', function() {
    let raw = '';


    const handlechange = (event) => {
        const fileReader = new FileReader();
        
        fileReader.readAsText(event.target.files[0], "UTF-8");
        fileReader.onload = e => {
            const _raw = e.target.result;
            raw = _raw;
        };
    }


    const download_json = (arr) => {
        let string_array = `[${arr.map(a => `"${a}"`).join(',')}]`;
        var blob = new Blob([string_array], {type: "application/json;charset=utf-8"});
        
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "_converted.json";
        a.click();
    }


    const convert_txt_to_json = (event) => {
        event.preventDefault();
        let array = raw.split(/\r?\n/);
        
        download_json(array);
    }
    

    const convert_form = document.getElementById('convert_form');
    const raw_input = document.getElementById('raw_file');

    convert_form.addEventListener('submit', convert_txt_to_json);
    raw_input.addEventListener('change', handlechange);
});