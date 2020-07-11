import { expect } from "chai";
// @ts-ignore
import GithubFormatters from "../../../../../../src/ts/github/formatters";

const dummyPush = require("../../../../../../data/dummy-push")


describe("GitHub Webhook push formatter", function () {
   it("Should return a default sentence when no commits are found", function () {
       expect(GithubFormatters.push(dummyPush)).to.equal('New push event on branch \'refs/tags/simple-tag\' with commits:\n');
   });

   it("Should create a new line when commits are included in the data", function () {
      const copyPush = dummyPush;
      copyPush.commits.push({
          "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
          "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
          "author": {
              "name": "Monalisa Octocat",
              "email": "support@github.com",
          },
          "message": "Fix all the bugs",
          "distinct": true,
      });
      expect(GithubFormatters.push(copyPush)).to.contain(':: :: Fix all the bugs\n');
   });
});
