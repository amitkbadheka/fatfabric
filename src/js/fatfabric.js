var tabs = $(".tab"),
  i,
  technbiz_threads = ["Techcrunch","HackerNews","DataTau","akshay"],
  design_threads = ["DesignerNews","ProductHunt","TheNextWeb"],
  dz_threads = ["DesignMilk","Behance","Dribbble"],
  custom_threads = [];
  number_of_tech = technbiz_threads.length,
  number_of_design = design_threads.length,
  number_of_dz = dz_threads.length,
  tech_string = "",
  design_string = "",
  dz_string = "",
  tech_string = "";

for(i = 0; i < number_of_tech; i++) {
  tech_string+= "<div class = 'container' id = '"+technbiz_threads[i]+"'>"+technbiz_threads[i]+" </div>";
}
document.getElementById("business").innerHTML = tech_string;
for(i = 0; i < number_of_design; i++) {
  design_string += "<div class = 'container' id = '"+design_threads[i]+"'>"+design_threads[i]+"</div>";
}
document.getElementById("design").innerHTML = design_string;

for(i = 0; i < number_of_dz; i++) {
  dz_string += "<div class = 'container' id = '"+dz_threads[i]+"'>"+dz_threads[i]+"</div>";
}
document.getElementById("design_plus").innerHTML = dz_string

var business = document.createElement("div");
// for(i = 0; i < number_of_feeds; i++) {
//  var div = document.createElement("div");

// }

tabs.on("click" , function(e) {
  var number_of_tabs = tabs.length;
  for(var i = 0; i < number_of_tabs; i++) {
    if($(tabs[i]).hasClass("is-tab-selected")) {
      var tab = $(tabs[i]),
        tab_child = tab.data("name");
        $("#"+tab_child).css("display","none");
      tab.removeClass("is-tab-selected");
      tab.addClass("not-selected");
      break;
    }
  }
  var target = $(e.target)
  , child = target.data("name");
  target.removeClass("not-selected");
  target.addClass("is-tab-selected");
  $("#"+child).css("display","block");
});

var fdb = new ForerunnerDB();

var db = fdb.db("fatfabric");
db.persist.driver("LocalStorage");
var feeds = db.collection("feeds");
feeds.load();
if (feeds.count() === 0) {
  var seedFeeds = [
      {title: "Techcrunch", feed: "http://feeds.feedburner.com/TechCrunch?format=xml", genre: "TechNBiz"},
      {title: "HackerNews", feed: "https://news.ycombinator.com/rss", genre: "TechNBiz"},
      {title: "DataTau", feed: "http://www.datatau.com/rss", genre: "TechNBiz"},
      {title: "DesignerNews", feed: "https://www.designernews.co/?format=rss", genre: "ProdDZ"},
      {title: "ProductHunt", feed: "https://www.producthunt.com/feed.atom", genre: "ProdDZ"},
      {title: "TheNextWeb", feed: "http://thenextweb.com/feed/", genre: "ProdDZ"},
      {title: "DesignMilk", feed: "http://feeds.feedburner.com/design-milk?format=xml", genre: "DZ++"},
      {title: "Behance", feed: "https://forums.adobe.com/community/feeds/allcontent", genre: "DZ++"},
      {title: "Dribbble", feed: "https://dribbble.com/shots/popular.rss", genre: "DZ++"}
    ]

  for(var i=0;i<seedFeeds.length;i++){
    feeds.insert(seedFeeds[i])
    feeds.save();
  }
}


google.load("feeds", "1");
function initialize() {
  var all_feeds = feeds.find();
  for(var j = 0; j<all_feeds.length;j++){
    var feed = new google.feeds.Feed(all_feeds[j].feed);
    container = document.getElementById("design"),
    html_string = "<div>";
    feed.load(function(result) {
      if (!result.error) {
        for (var i = 0; i < result.feed.entries.length; i++) {
          var entry = result.feed.entries[i];
          html_string += "<h3><a href='"+entry.link+"'>"+entry.title+"</a></h3>"
          html_string += "<p>"+entry.contentSnippet+"</p>"
        }
      }
      html_string += "</div>";
      container.innerHTML = container.innerHTML + html_string;
    });
  }

}
google.setOnLoadCallback(initialize);

