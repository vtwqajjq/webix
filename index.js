const addTagsBtn = document.getElementById('add-tags-btn');
const tagsNames = document.getElementById('tags-names');
const tagsWrapper = document.querySelector('.tags-wrapper');
const switchModes = document.querySelector('.checkbox-input');
const buttonWrapper = document.querySelector('.button-wrapper');
const deleteButtons = tagsWrapper.getElementsByTagName('button');

var tags=[];
var updatedTags;
let tagz=[];
!localStorage.tags ? tagz = [] : tagz = JSON.parse(localStorage.getItem('tags'));


function Tag(description){
    this.description = description;
}

const createTemplate = (tag, index) => {
    return `
    <div class="tags-content">
        <div class="description">${tag.description}</div>
        <div class="button-delete">
            <button onclick="deleteTag(${index})" class="btn-delete">X</button>
        </div>
    </div> `
}

const fillTagsArea = () =>{
    tagsWrapper.innerHTML = ''
    if (tagz.length > 0) 
        tagz.forEach((item, index) => {
            tagsWrapper.innerHTML += createTemplate(item, index)
        });
    }
fillTagsArea();

const updateLocal = () => {
    localStorage.setItem ('tags', JSON.stringify(tagz))
}

addTagsBtn.addEventListener('click', () => {
    if (tagsNames.value == 0 || tagsNames.value ===''){
        window.alert("You can't add empty value")
    } else {
    tags.push(tagsNames.value);
    updatedTags = tags.join(',').split(',');
        for (let i=0; i<updatedTags.length; i++){
            tagz.push (new Tag(updatedTags[i]));
        }
    }   
    tags=[]
    updateLocal();
    fillTagsArea();
    tagsNames.value='';
})

const deleteTag = index => {
    tagz.splice(index,1);
    updateLocal();
    fillTagsArea();
}

switchModes.addEventListener('click', () => {
    addTagsBtn.classList.toggle('readonly-mode');
    for (let i=0; i<deleteButtons.length; i++){
        deleteButtons[i].classList.toggle('delete-btn')
    }
})

switchModes.onchange = function() {
    addTagsBtn.disabled = !!this.checked;
    tagsNames.disabled = !!this.checked;   
};