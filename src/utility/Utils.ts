import { injectable } from "inversify";
import { dependencyLocator } from "../di-container";

@injectable()
class Utils {
  private readonly logger = dependencyLocator.getLoggerService();

  replaceKeyword =  (
    inputString: string,
    keywordToReplace: string,
    replacement: string
  ): string => {
    const regex = new RegExp(keywordToReplace, "g");
    const resultString = inputString.replace(regex, replacement);
    return resultString;
  };
}

export default Utils ;
