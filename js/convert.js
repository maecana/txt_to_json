window.addEventListener('load', function () {
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
        var blob = new Blob([string_array], { type: "application/json;charset=utf-8" });

        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "_converted.json";
        a.click();
    }


    const convert_txt_to_json = (event) => {
        event.preventDefault();
        let _el_div = document.createElement("div");
        let _el_hr = document.createElement("hr");
        _el_div.appendChild(_el_hr);

        let array = raw.split(/\r?\n/);
        let _el_p = document.createElement("p");
        var node = document.createTextNode(`ARRAY LENGTH BEFORE: ${array.length}`);
        _el_p.appendChild(node);
        _el_div.appendChild(_el_p);

        array = Array.from(new Set(array));

        let clean_array = array.filter(a => {
            const ca_regex = new RegExp(/^0x[a-fA-F0-9]{40}$/g);
            let ca = a.replace('/\s+/g', '');
            let matches = ca.match(ca_regex);


            if (matches != null) {
                if (matches.length > 0) {
                    return matches[0];
                }
            }

            return false;
        });

        array = Array.from(new Set(clean_array));
        console.dir(array);
        _el_p = document.createElement("p");
        node = document.createTextNode(`ARRAY LENGTH AFTER: ${array.length}`);
        _el_p.appendChild(node);
        _el_div.appendChild(_el_p);

        info_div.classList.add("vh50", "overflow-auto");
        info_div.prepend(_el_div);

        download_json(array);
    }


    const convert_form = document.getElementById('convert_form');
    const raw_input = document.getElementById('raw_file');
    const info_div = document.getElementById('info-div');

    convert_form.addEventListener('submit', convert_txt_to_json);
    raw_input.addEventListener('change', handlechange);
});