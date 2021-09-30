const videoCardContainer = document.querySelector(".video-container");

let api_key = "AIzaSyAdzbuqG619fKswtVGhP0YQpthq1zFINLg";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "US",
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));

const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video_data);
    });
};

const makeVideoCard = (data) => {
  videoCardContainer.innerHTML += `
    <div class="navbar__video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="video-container__thumbnail" alt="">
        <div class="video-container__vid-content">
            <img src="${data.channelThumbnail}" class="video-container__channel-avatar" alt="">
            <div class="info">
                <h4 class="video-container__video-title">${data.snippet.title}</h4>
                <p class="video-container__channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
};

// search bar

const searchInput = document.querySelector(".navbar__search-field");
const searchBtn = document.querySelector(".navbar__search-btn");
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
});
