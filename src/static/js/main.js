
$(document).ready(()=> {
    $('#add_device').click(()=> {
        swal({
            text: 'Input Device ID',
            input:'text',
            content: 'input',
            buttons:{
                confirm: "Ok",
                cancel: "Cancel",
            },
        }).
            then((value)=> {
                $.post('/dashboard/add_device',{value: value,},(response)=>{
                    console.log(response) 
                    if(response.response == 'error'){
                        swal({
                            icon: 'error',
                            title: response.message
                        })
                        return
                    }

                    swal({
                        icon: 'success',
                        title: "Device has been added"
                    })



                })
            })
            .catch((e)=>{
                console.error(e) 
                swal({
                    icon: 'error',
                    title: "Something went wrong"
                })
            })

    })


    $('#settings-tab').hide()
    $('#notification-tab').show()

    $('#device_rename').click(()=> {
        
    })

})

function notification_tab(){
    $("#li-notif").addClass("is-active")
    $("#li-sett").removeClass("is-active")
    $('#settings-tab').hide()
    $('#notification-tab').show()
}

function settings_tab(){
    $("#li-notif").removeClass("is-active")
    $("#li-sett").addClass("is-active")
    $('#settings-tab').hide()
    $('#settings-tab').show()
    $('#notification-tab').hide()
}

function notifshow(src ){
    console.log(src)
    swal({
       icon: src,
    })
    
}
