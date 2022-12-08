(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['leaderboardItem'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"leaderboard-item\">\r\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":16}}}) : helper)))
    + " <span class=\"leaderboard-time\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"min") || (depth0 != null ? lookupProperty(depth0,"min") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"min","hash":{},"data":data,"loc":{"start":{"line":3,"column":48},"end":{"line":3,"column":55}}}) : helper)))
    + ":0"
    + alias4(((helper = (helper = lookupProperty(helpers,"sec") || (depth0 != null ? lookupProperty(depth0,"sec") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sec","hash":{},"data":data,"loc":{"start":{"line":3,"column":57},"end":{"line":3,"column":64}}}) : helper)))
    + "</span>\r\n    </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"leaderboard-item\">\r\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":7,"column":16}}}) : helper)))
    + " <span class=\"leaderboard-time\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"min") || (depth0 != null ? lookupProperty(depth0,"min") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"min","hash":{},"data":data,"loc":{"start":{"line":7,"column":48},"end":{"line":7,"column":55}}}) : helper)))
    + ":"
    + alias4(((helper = (helper = lookupProperty(helpers,"sec") || (depth0 != null ? lookupProperty(depth0,"sec") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sec","hash":{},"data":data,"loc":{"start":{"line":7,"column":56},"end":{"line":7,"column":63}}}) : helper)))
    + "</span>\r\n    </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"lowsec") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":9,"column":7}}})) != null ? stack1 : "");
},"useData":true});
})();