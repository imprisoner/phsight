
/*<![CDATA[*/
    // jQuery(function($) {
    //     jQuery('#yw0').after("<a class=\"registration-captcha-refresh\" id=\"yw0_button\" href=\"\/auth\/captcha?refresh=1\"><i class=\"fas fa-redo-alt\"><\/i><\/a>");
    //     jQuery(document).on('click', '#yw0_button', function(){
    //         jQuery.ajax({
    //             url: "\/auth\/captcha?refresh=1",
    //             dataType: 'json',
    //             cache: false,
    //             success: function(data) {
    //                 jQuery('#yw0').attr('style', `background-image: ${data['url']}`);
    //                 jQuery('body').data('captcha.hash', [data['hash1'], data['hash2']]);
    //             }
    //         });
    //         return false;
    //     });
        
    //     jQuery('#registration-form').yiiactiveform({'validateOnSubmit':true,'attributes':[{'id':'RegistrationForm_login','inputID':'RegistrationForm_login','errorID':'RegistrationForm_login_em_','model':'RegistrationForm','name':'login','enableAjaxValidation':true,'clientValidation':function(value, messages, attribute) {
        
    //     if(jQuery.trim(value)=='') {
    //         messages.push("\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u043f\u043e\u043b\u0435 \u00ab\u041f\u0441\u0435\u0432\u0434\u043e\u043d\u0438\u043c\u00bb.");
    //     }
        
        
    //     if(jQuery.trim(value)!='') {
            
    //     if(value.length<2) {
    //         messages.push("\u041f\u0441\u0435\u0432\u0434\u043e\u043d\u0438\u043c \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u043a\u043e\u0440\u043e\u0442\u043a\u0438\u0439 (\u041c\u0438\u043d\u0438\u043c\u0443\u043c: 2 \u0441\u0438\u043c\u0432.).");
    //     }
        
    //     if(value.length>30) {
    //         messages.push("\u041f\u0441\u0435\u0432\u0434\u043e\u043d\u0438\u043c \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0434\u043b\u0438\u043d\u043d\u044b\u0439 (\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c: 30 \u0441\u0438\u043c\u0432.).");
    //     }
        
    //     }
        
        
    //     if(jQuery.trim(value)!='' && !value.match(/^[a-zA-Z0-9_][_a-zA-Z0-9-]*[_a-zA-Z0-9]$/)) {
    //         messages.push("\u041f\u0441\u0432\u0434\u043e\u043d\u0438\u043c \u043c\u043e\u0436\u0435\u0442 \u0441\u043e\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u0442\u043e\u043b\u044c\u043a\u043e \u0430\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u0438\u0435 \u0431\u0443\u043a\u0432\u044b, \u0446\u0438\u0444\u0440\u044b \u0438 \u0442\u0438\u0440\u0435. \u0422\u0438\u0440\u0435 \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0441\u0442\u043e\u044f\u0442\u044c \u0432 \u043d\u0430\u0447\u0430\u043b\u0435 \u0438 \u0432 \u043a\u043e\u043d\u0446\u0435.");
    //     }
        
        
    //     if(jQuery.trim(value)!='' && jQuery.inArray(value, ["www","smtp","mail","admin","pop","pop3","imap","best","rss","offline","ads","market","tools","api","awards","pda","m","top"])>=0) {
    //         messages.push("\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0435 \u0442\u0430\u043a\u043e\u0433\u043e \u043f\u0441\u0435\u0432\u0434\u043e\u043d\u0438\u043c\u0430 \u0437\u0430\u043f\u0440\u0435\u0449\u0435\u043d\u043e");
    //     }
        
    //     }},{'id':'RegistrationForm_email','inputID':'RegistrationForm_email','errorID':'RegistrationForm_email_em_','model':'RegistrationForm','name':'email','enableAjaxValidation':true,'clientValidation':function(value, messages, attribute) {
        
    //     if(jQuery.trim(value)=='') {
    //         messages.push("\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u043f\u043e\u043b\u0435 \u00ab\u041f\u043e\u0447\u0442\u0430\u00bb.");
    //     }
        
        
    //     if(jQuery.trim(value)!='') {
            
    //     if(value.length>50) {
    //         messages.push("\u041f\u043e\u0447\u0442\u0430 \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0434\u043b\u0438\u043d\u043d\u044b\u0439 (\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c: 50 \u0441\u0438\u043c\u0432.).");
    //     }
        
    //     }
        
        
        
    //     if(jQuery.trim(value)!='' && !value.match(/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/)) {
    //         messages.push("\u041d\u0435\u0432\u0435\u0440\u043d\u043e \u0443\u043a\u0430\u0437\u0430\u043d \u0430\u0434\u0440\u0435\u0441 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0443\u043a\u0430\u0436\u0438\u0442\u0435 \u043f\u043e\u0447\u0442\u0443 \u0432 \u0432\u0438\u0434\u0435 mail@example.com");
    //     }
        
    //     }},{'id':'RegistrationForm_verifyCode','inputID':'RegistrationForm_verifyCode','errorID':'RegistrationForm_verifyCode_em_','model':'RegistrationForm','name':'verifyCode','enableAjaxValidation':true,'clientValidation':function(value, messages, attribute) {
        
    //     if(jQuery.trim(value)=='') {
    //         messages.push("\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u043f\u043e\u043b\u0435 \u00ab\u0417\u0430\u0449\u0438\u0442\u043d\u044b\u0439 \u043a\u043e\u0434\u00bb.");
    //     }
        
        
    //     var hash = jQuery('body').data('captcha.hash');
    //     if (hash == null)
    //         hash = 632;
    //     else
    //         hash = hash[1];
    //     for(var i=value.length-1, h=0; i >= 0; --i) h+=value.toLowerCase().charCodeAt(i);
    //     if(h != hash) {
    //         messages.push("\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u044b\u0439 \u043a\u043e\u0434 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438.");
    //     }
        
    //     }},{'id':'RegistrationForm_accept','inputID':'RegistrationForm_accept','errorID':'RegistrationForm_accept_em_','model':'RegistrationForm','name':'accept','enableAjaxValidation':true,'clientValidation':function(value, messages, attribute) {
        
    //     if(jQuery.trim(value)!='' && value!="1" && value!="0") {
    //         messages.push("Accept \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c 1 \u0438\u043b\u0438 0.");
    //     }
        
        
    //     if(jQuery.trim(value)=='') {
    //         messages.push("\u0412\u044b \u0434\u043e\u043b\u0436\u043d\u044b \u043f\u0440\u0438\u043d\u044f\u0442\u044c \u0443\u0441\u043b\u043e\u0432\u0438\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u043e\u0433\u043e \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u044f");
    //     }
        
    //     }}],'errorCss':'error'});
    //     });
        /*]]>*/
        