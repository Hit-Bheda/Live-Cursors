import { infoLogger } from "./logger/logger";
import app from "./app";

app.listen(3000, () => {
    infoLogger.log('info','Server Is Listning On Port 3000')
})