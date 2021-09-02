const validation = {
    testEmail(email){
        return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(email)
    },
    testIP(ip){
        return /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/.test(ip)
    },
    testMAC(mac){
        return /^([0-9A-Z]{2}-){5}[0-9A-Z]{2}$/.test(mac)
    },
    testFileName(filename){
        return /^[a-zA-Z0-9]+\.txt$/.test(filename)
    },
    testRow(number){
        return /^[0-9]+$/.test(number)
    },
    checkType(query){
        // console.log(this);
        if(this.testEmail(query)){
            return 'email'
        }
        if (this.testIP(query)){
            return 'ip'
        }
        if(this.testMAC(query)){
            return 'mac'
        }
        if(this.testFileName(query)){
            return 'fileName'
        }
        if(this.testRow(query)){
            return 'row'
        }
        return 'text'

    }
} 

export {validation}

