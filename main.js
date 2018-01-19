(function () {
    "use strict";
    let btnAdd = document.querySelector(".btn.add");
    let addedTagsWrapper = document.querySelector(".tags-wrapper");
    let optionsWrapper = document.querySelector(".options-wrapper");
    let selectedTagsWrapper = document.querySelector(".selected-tags-wrapper");

    let arrTags = [];
    let arrOptions = [];
    let selectedTags = [];

    function clearInput(id) {
        document.getElementById(id).value = "";
    }

    function clearWrapper(wrapper) {
        wrapper.innerHTML = "";
    }

    function addNewTag() {
        let tagValue = document.getElementById("tag-value").value.toString().toLowerCase().trim();
        clearInput("tag-value");
        if (tagValue == "") {
            alert("Введите тег");
            return;
        }

        if (arrTags.indexOf(tagValue) === -1 && arrOptions.indexOf(tagValue) === -1 && selectedTags.indexOf(tagValue) === -1) {
            arrTags.push(tagValue);
        } else if (selectedTags.indexOf(tagValue) !== -1) {
            alert("Тег уже выбран");
        } else {
            alert("Тег уже существует");
        }
        printTags(addedTagsWrapper, true, arrTags, arrOptions, selectedTags);

    }

    function printTags(wrapper, isRemovable, array, array2, array3) {
        array2 = array2 || [];
        array3 = array3 || [];
        array = array.concat(array2, array3).sort();
        clearWrapper(wrapper);
        array.forEach(function (tagValue) {
            let newTag = document.createElement("span");
            newTag.classList.add("tag");
            newTag.innerHTML = tagValue;
            if (isRemovable) {
                let btnClose = document.createElement("b");
                btnClose.classList.add("btn-close");
                btnClose.innerHTML = "x";
                newTag.appendChild(btnClose);
            }

            wrapper.appendChild(newTag);
        });
        test();
    }

    function deleteTag(value, ...arrays) {

        arrays.forEach(function (array) {
            let deleteElementIndex = array.indexOf(value);
            if (deleteElementIndex !== -1) {
                array.splice(deleteElementIndex, 1);
            }
        });
    }


    function test() {
        console.log("arrTags: " + arrTags);
        console.log("arrOptions: " + arrOptions);
        console.log(" selectedTags: " + selectedTags)
    }


    btnAdd.addEventListener("click", addNewTag);
    document.getElementById("tag-value").addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {

            addNewTag();
        }
    });

    document.body.addEventListener("click", function (e) {
        if (e.target.classList.contains('btn-close')) {
            let tagContent = e.target.closest(".tag").innerHTML.replace(/<b class="btn-close">x<\/b>/g, "");
            deleteTag(tagContent, arrTags, arrOptions, selectedTags);
            printTags(addedTagsWrapper, true, arrTags, arrOptions, selectedTags);
            printTags(optionsWrapper, false, arrOptions);
            printTags(selectedTagsWrapper, true, selectedTags);

    }
    });

    document.getElementById("search").addEventListener("input", function () {
        let inputValue = document.getElementById("search").value.toString().toLowerCase();
        if (inputValue == "") {
            arrTags = arrTags.concat(arrOptions.splice(0));
            clearWrapper(optionsWrapper);
            return;
        }
        arrTags = arrTags.concat(arrOptions.splice(0));
        for (let i = 0; i < arrTags.length; i++) {
            if (arrTags[i].indexOf(inputValue) === 0) {
                arrOptions = arrOptions.concat(arrTags.splice(i, 1));
                i--;
            }
        }


        printTags(optionsWrapper, false, arrOptions);


    });

    document.getElementById("search").addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
            selectedTags = selectedTags.concat(arrOptions.splice(0));
            clearInput("search");
            printTags(selectedTagsWrapper, true, selectedTags);
            printTags(optionsWrapper, false, arrOptions);


        }
    });

    document.querySelector(".options-wrapper").addEventListener("click", function (e) {
        if (e.target.classList.contains('tag')) {
            let tagContent = e.target.closest(".tag").innerHTML;
            let elementIndex = arrOptions.indexOf(tagContent);

            selectedTags = selectedTags.concat(arrOptions.splice(elementIndex, 1));
            clearInput("search");
            printTags(selectedTagsWrapper, true, selectedTags);
            printTags(optionsWrapper, false, arrOptions);

        }

    });


}());
