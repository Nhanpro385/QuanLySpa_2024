// snowflakeUtil.js
import { Snowflake } from "@theinternetfolks/snowflake";

// Export the function to generate Snowflake ID
const generateSnowflakeId = () => {
    return Snowflake.generate();
};

export default generateSnowflakeId;
