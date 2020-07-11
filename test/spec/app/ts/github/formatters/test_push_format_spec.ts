import { expect } from "chai";
// @ts-ignore
import GithubFormatters from "../../../../../../src/ts/github/formatters";

const dummyPush = require("../../../../../../data/dummy-push")


describe("GitHub Webhook push formatter", function () {
   it("Should return a default sentence when no commits are found", function () {
       const copyPush = dummyPush;
       copyPush.commits = [];
       expect(GithubFormatters.push(dummyPush)).to.equal('New push event on branch \'refs/tags/simple-tag\' with commits:\n');
   });

   it("Should create a new line when commits are included in the data", function () {
      const copyPush = dummyPush;
      copyPush.commits = [];
      copyPush.commits.push({
          "id": "039fb150a287031ae2404320680a41fbf1be85e1",
          "tree_id": "5682731b92f0b03a0f1339f34e682ca01014d67a",
          "distinct": true,
          "message": "first commit",
          "timestamp": "2020-07-01T00:00:00+01:00",
          "url": "https://github.com/Codertocat/Hello-World/commit/039fb150a287031ae2404320680a41fbf1be85e1",
          "author": {
              "name": "Codertocat",
              "email": "21031067+Codertocat@users.noreply.github.com",
              "username": "Codertocat"
          },
          "committer": {
              "name": "Codertocat",
              "email": "21031067+Codertocat@users.noreply.github.com",
              "username": "Codertocat"
          },
          "added": [
              "hello-world"
          ],
          "removed": [],
          "modified": []
      });
      expect(GithubFormatters.push(copyPush)).to.contain('\t2020-07-01T00:00:00+01:00 :: Codertocat :: first commit\n');
   });
});
