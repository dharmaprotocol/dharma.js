#!/usr/bin/env bash

typedoc --excludePrivate --excludeExternals --target ES5 --json ./scripts/documentation/output/typedoc.json src/*
