.PERIOD_ID |= { "$date": (. + ":") }

# cat .\dummy-node-data.json | jq .[] | jq -f .\fix_data.jq > temp-node.json
# https://hjson.github.io/try.html to fix the comma and array problem
# https://jsonformatter.org/ to minify/compact
# mongoimport
# These resources helped format the new CSV for Mongo