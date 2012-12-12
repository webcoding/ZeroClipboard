ZeroClipboard.Client.prototype.glue = function (elem, appendElem, stylesToAdd) {
  // glue to DOM element
  // elem can be ID or actual DOM element object
  this.domElement = ZeroClipboard.$(elem);

  // float just above object, or default zIndex if dom element isn't set
  if (this.domElement.style.zIndex) {
    this.zIndex = parseInt(this.domElement.style.zIndex, 10) + 1;
  }

  // check if the element has a title
  if (!this.title && this.domElement.getAttribute("title")) {
    this.title = this.domElement.getAttribute("title");
  }

  // If the dom element contains data-clipboard-text set a default
  if (!this.clipText && this.domElement.getAttribute("data-clipboard-text")) {
    this.clipText = this.domElement.getAttribute("data-clipboard-text");
  }

  if (typeof(appendElem) == 'string') {
    appendElem = ZeroClipboard.$(appendElem);
  }
  else if (typeof(appendElem) == 'undefined') {
    appendElem = document.getElementsByTagName('body')[0];
  }

  // find X/Y position of domElement
  var box = ZeroClipboard.getDOMObjectPosition(this.domElement, appendElem);

  // create floating DIV above element
  this.div = document.createElement('div');
  var style = this.div.style;
  style.position = 'absolute';
  style.left = '' + box.left + 'px';
  style.top = '' + box.top + 'px';
  style.width = '' + box.width + 'px';
  style.height = '' + box.height + 'px';
  style.zIndex = this.zIndex;

  if (typeof(stylesToAdd) == 'object') {
    for (var addedStyle in stylesToAdd) {
      style[addedStyle] = stylesToAdd[addedStyle];
    }
  }

  // style.backgroundColor = '#f00'; // debug

  appendElem.appendChild(this.div);

  this.div.innerHTML = this.getHTML(box.width, box.height);
};