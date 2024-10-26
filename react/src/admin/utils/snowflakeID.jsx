// snowflakeUtil.js
import { Snowflake } from "@theinternetfolks/snowflake";



// Export the function to generate Snowflake ID
export const generateSnowflakeId = () => {
    return Snowflake.generate();
};
