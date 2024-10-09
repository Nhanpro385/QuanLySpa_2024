// snowflakeUtil.js
import SnowflakeId from "snowflake-id";

const snowflake = new SnowflakeId();

// Export the function to generate Snowflake ID
export const generateSnowflakeId = () => {
    return snowflake.generate();
};
