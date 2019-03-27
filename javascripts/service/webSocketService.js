function WebSocketService () {

    this.stompClient = null;

    this.getStompClient = function () {
        return this.stompClient;
    }


    this.connect = function(url){
        console.log('connect')
        const socket = new SockJS(url);
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({},
            () => {
                return this.stompClient
            }
        );
    }

    this.disconnect = function() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            this.stompClient = null;
        }
        if (this.subscription !== null) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    this.send = function(channel, message){
        if (this.stompClient !== null && this.stompClient.connected) {
            this.stompClient.send(
                `/topic/${channel}`,
                JSON.stringify({message: message()}),
                {} // header
            );
        }
    }
}
