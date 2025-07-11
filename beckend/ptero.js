const axios = require('axios');
require('dotenv').config();

module.exports = async function createServer(name) {
  const api = process.env.PTERO_API;
  const key = process.env.PTERO_API_KEY;

  const config = {
    method: 'post',
    url: `${api}/api/application/servers`,
    headers: {
      'Authorization': key,
      'Content-Type': 'application/json',
      'Accept': 'Application/vnd.pterodactyl.v1+json'
    },
    data: {
      name: name,
      user: parseInt(process.env.PTERO_USER_ID),
      egg: parseInt(process.env.PTERO_EGG_ID),
      docker_image: "ghcr.io/pterodactyl/yolks:nodejs_21",
      startup: "npm start",
      environment: {
        AUTO_UPDATE: "0",
        USER_UPLOAD: "0",
        INSTALL_REPO: "https://github.com/user/repo",
        INSTALL_BRANCH: "main"
      },
      limits: {
        memory: 512,
        swap: 0,
        disk: 1024,
        io: 500,
        cpu: 100
      },
      feature_limits: {
        databases: 0,
        allocations: 1,
        backups: 0
      },
      allocation: {
        default: 1
      },
      deploy: {
        locations: [parseInt(process.env.PTERO_LOCATION_ID)],
        dedicated_ip: false,
        port_range: []
      },
      start_on_completion: true
    }
  };

  const response = await axios(config);
  return response.data;
};