window.commonUtils = {
    alert : function(msg){
        new jBox("Notice",{
            attributes: {
                x: 'right',
                y: 'bottom'
            },
            stack: false,
            animation: {
                open: 'tada',
                close: 'zoomIn'
            },
            color: "blue",
            content: msg
        });
    },
    warn : function(msg){
        new jBox("Notice",{
            attributes: {
                x: 'right',
                y: 'bottom'
            },
            stack: false,
            animation: {
                open: 'tada',
                close: 'zoomIn'
            },
            color: "red",
            content: msg
        });
    },
    confirm : function(setting){
        var confirmBox = new jBox("Confirm",setting);
        confirmBox.open();
    }
};