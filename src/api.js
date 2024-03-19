import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. 
   * handle: a string that is the company handle
  */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on a company by id */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Get list of companies 
   * filter: an object that can contain the following keys:
   * - name: a string that is the company name
  */

  static async getCompanies(filter) {
    let res = await this.request(`companies`, filter);
    return res.companies;
  }

  /** Get list of jobs 
   * filter: an object that can contain the following keys:
   * - title: a string that is the job title
  */
  static async getJobs(filter) {
    let res = await this.request(`jobs`, filter);
    return res.jobs;
  }

  /** Get current user */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update user profile */
  static async updateUserProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Apply to a job 
   * username: a string that is the username
   * jobId: a string that is the job id
  */
  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.applied;
  }

  /** Login user 
   * data: an object that can contain the following keys:
   * - username: a string that is the username
   * - password: a string that is the password
  */
  static async loginUser(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Register user 
   * data: an object that can contain the following keys:
   * - username: a string that is the username
   * - password: a string that is the password
   * - firstName: a string that is the first name
   * - lastName: a string that is the last name
   * - email: a string that is the email
  */
  static async registerUser(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }
}

export default JoblyApi;