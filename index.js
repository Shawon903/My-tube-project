console.log("index is connected")

function loadCategories(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=> res.json())
    .then((data)=>displayCategories(data.categories))
}
function displayCategories(categories){
    const categoryContainer = document.getElementById("category-container");
    for(let cat of categories){
        console.log(cat);
        // create element of div
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#ff1f3d] hover:text-white">${cat.category}</button>
        `
        // append category
        categoryContainer.append(categoryDiv);
    }
}
function loadVideos(searchText = ""){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((response)=> response.json())
    .then(data => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos)
    })
}
const displayVideos =(videos)=>{
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML="";
    if(videos.length == 0){
      videoContainer.innerHTML = `
      <div class="col-span-full text-center flex flex-col justify-center items-center py-20">
            <img class="w-[120px] " src="ph-tube-resources-main/Icon.png" alt="">
            <h2 class="text-2xl font-bold pt-3">Oops!! Sorry, There is no content here</h2>
        </div>
      `;
      return;
    }

    videos.forEach(video=>{
        console.log(video)
        const videoCard = document.createElement("div");
        videoCard.innerHTML=`
        <div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-[200px] object-cover"
                src="${video.thumbnail}" />
                <span class="absolute text-white bottom-2 right-2 bg-black px-2 text-sm rounded-sm">3hrs 56 min ago</span>
            </figure>
            <div class=" flex gap-2 px-0 py-5">
              <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <div class="intro">
                <h2 class="text-sm font-semibold">${video.title}</h2>
                <p class="text-sm text-gray-400 flex gap-1">
                ${video.authors[0].profile_name} 
                ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : `` } 
                </p>
                <p class="text-sm text-gray-400">${video.others.views}</p>
              </div>
            </div>
            <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
          </div>
        
        `
        videoContainer.append(videoCard);
    })
}
const loadCategoryVideos=(id)=>{
    
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      console.log(clickedButton);
      displayVideos(data.category)
    })
}
function removeActiveClass(){
  const activeButtons = document.getElementsByClassName("active");
  for(let btn of activeButtons){
    btn.classList.remove("active");
  }
  
}
const loadVideoDetails=(videoId)=>{
  console.log(videoId)
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
  .then(res=>res.json())
  .then(data=>displayVideoDetails(data.video))
}
const displayVideoDetails=(video)=>{
    console.log(video)
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML= `
    <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      
    </div>
  </div>
</div>
    
    `
}

document.getElementById("search-input").addEventListener("keyup", (e)=>{
  const input = e.target.value;
  loadVideos(input)
})

loadCategories()
