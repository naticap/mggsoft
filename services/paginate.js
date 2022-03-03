module.exports = {
    getPagination: (page, size) => {
        const limit = size ? +size : null;
        const offset = page && limit ? (page -1) * limit : 0;
        
        return { limit, offset };
    },
    getPagingData: (data, page, limit) => {
        const { count, rows } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(count / limit);
      
        return { count, rows, totalPages, currentPage };
    }
}