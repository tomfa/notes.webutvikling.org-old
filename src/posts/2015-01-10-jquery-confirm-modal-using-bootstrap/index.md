---
title: "jquery confirm modal using bootstrap"
date: 2015-01-10
image: ./jon-tyson-hhq1Lxtuwd8-unsplash.jpg
tags: ["guide", bootstrap, jquery, modal]
author: tomfa
status: publish
---

This little JavaScript snippet lets you easily decide (from another javascript function) to show a confirm-dialog (Bootstrap), and functions to be executed on cancel/confirm. 

```javascript
/*
* jQuery confirm modal using bootstrap 3.0 (might work with other, shrug)
*
* Usage:
*   var otherFunction = function(){
*       funkyDialogBox(
*           "Will you marry me", 
*           function(){ console.log('She said YES! :D'}, 
*           function(){ console.log('She said no :(')
*       }
*   }
*/

var funkyDialogBox = function(message, confirmCallback, cancelCallback) {
    var unbind = function(){
        $('#dataConfirmModal').unbind('hidden.bs.modal', wrapperCancel);
        $('#dataConfirmOK').unbind();
    }
    var wrapperConfirm = function(){
        if (typeof confirmCallback !== 'undefined')
            confirmCallback()
        unbind();
        $('#dataConfirmModal').modal('hide');
    };
    var wrapperCancel = function(){
        if (typeof cancelCallback !== 'undefined')
            cancelCallback()
        unbind();
    }
    if (!$('#dataConfirmModal').length) {
        $('body').append('<div id="dataConfirmModal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true&times;</span></button><h4 class="modal-title">Please Confimt</h4></div><div class="modal-body text-center"><p>Er du sikker?</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button><button type="button" id="dataConfirmOK" class="btn btn-primary">Confirm</button></div></div></div></div>');
    }
    unbind();
    $('#dataConfirmModal').find('.modal-body').text(message);
    $('#dataConfirmOK').click(wrapperConfirm);
    $('#dataConfirmModal').modal({show:true})
    $('#dataConfirmModal').on('hidden.bs.modal', wrapperCancel);
}
```

Check it out at [https://gist.github.com/tomfa/12bf7651d6a346eb2942](https://gist.github.com/tomfa/12bf7651d6a346eb2942) 


Want one made for submit-buttons, link etc? See [http://www.petefreitag.com/item/809.cfm](http://www.petefreitag.com/item/809.cfm)
