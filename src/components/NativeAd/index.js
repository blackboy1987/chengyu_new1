Component({
    properties: {
        unitId:{
            type: String,
        }
    },
    lifetimes: {
        attached: function () {
            console.log(this.data,"attached")
        },
    },
    data: {},
    methods: {}
});
