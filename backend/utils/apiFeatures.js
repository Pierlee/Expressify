class APIFeatures {
  constructor(query, queryStr){
    this.query = query
    this.queryStr = queryStr
  }

  search(){
    const keyword = this.queryStr.keyword ? {
      name: {
        $regex: this.queryStr.keyword,
        $options: 'i'
      }
    } : {}

    console.log(keyword)
    this.query = this.query.find({ ...keyword })

    return this
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    console.log(queryCopy)
  
    // Removing fields that are not filters
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach(el => delete queryCopy[el]);

    // Advanced filters for price and ratings and Convert filters into MongoDB format
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
  
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // 4️⃣ Pagination (e.g., ?page=2&limit=10)
  paginate(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = (currentPage - 1) * resPerPage;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures