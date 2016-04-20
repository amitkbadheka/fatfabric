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
    container = document.getElementById("feed"),
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