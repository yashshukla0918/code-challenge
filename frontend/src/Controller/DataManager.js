import axios, { AxiosError } from "axios";
class DataManager {
    async getList() {
        const response = await fetch('http://localhost:3010/list')
        const { data } = await response.json()
        return data
    }

    async addNewData(obj) {
        let response = await axios.post('http://localhost:3010/item', obj)
        let status = await response?.status
        let data = await response?.data
        return [status, data]
    }

    async updateData(obj) {
        console.log(obj);
        const response = await axios.put('http://localhost:3010/item', obj)
        const status = await response?.status
        const data = await response?.data
        return [status, data]
    }

    async deleteData(id) {
        const response = await axios.delete(`http://localhost:3010/item/${id}`)
        const status = await response?.status
        const data = await response?.data
        return [status, data]
    }
}

export default DataManager;