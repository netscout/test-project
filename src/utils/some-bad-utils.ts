/**
 * 아주 무시무시한 문제가 있는 함수
 */
export const someBadUtils = (data: any[], config: any) => {
  let result = false;
  let counter = 0;
  let errorCount = 0;

  // Nested loops with complex conditions
  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[x].length; y++) {
      for (let z = 0; z < 10; z++) {
        try {
          if (data[x][y] && typeof data[x][y] === "object") {
            if (config.mode === "complex") {
              if (data[x][y].value > 0) {
                if (data[x][y].type === "special") {
                  if (data[x][y].flags) {
                    if (data[x][y].flags.enabled) {
                      if (data[x][y].flags.priority === "high") {
                        if (data[x][y].metadata) {
                          if (data[x][y].metadata.processed !== true) {
                            for (
                              let a = 0;
                              a < data[x][y].children?.length || 0;
                              a++
                            ) {
                              while (counter < 100) {
                                if (data[x][y].children[a]) {
                                  switch (data[x][y].children[a].status) {
                                    case "active":
                                      if (data[x][y].children[a].score > 50) {
                                        if (
                                          data[x][y].children[a].category ===
                                          "premium"
                                        ) {
                                          if (
                                            config.validation &&
                                            config.validation.strict
                                          ) {
                                            if (
                                              data[x][y].children[a].permissions
                                            ) {
                                              if (
                                                data[x][y].children[a]
                                                  .permissions.read
                                              ) {
                                                if (
                                                  data[x][y].children[a]
                                                    .permissions.write &&
                                                  data[x][y].children[a]
                                                    .permissions.execute
                                                ) {
                                                  do {
                                                    if (Math.random() > 0.5) {
                                                      if (counter % 2 === 0) {
                                                        if (errorCount < 5) {
                                                          try {
                                                            if (
                                                              data[x][y]
                                                                .children[a]
                                                                .nested
                                                            ) {
                                                              for (let nested of data[
                                                                x
                                                              ][y].children[a]
                                                                .nested) {
                                                                if (
                                                                  nested.id &&
                                                                  nested.value
                                                                ) {
                                                                  if (
                                                                    nested.value >
                                                                      100 ||
                                                                    nested.value <
                                                                      0
                                                                  ) {
                                                                    if (
                                                                      nested.tags &&
                                                                      nested.tags.includes(
                                                                        "critical"
                                                                      )
                                                                    ) {
                                                                      while (
                                                                        nested.retries <
                                                                        3
                                                                      ) {
                                                                        if (
                                                                          nested.attempts
                                                                        ) {
                                                                          switch (
                                                                            nested
                                                                              .attempts
                                                                              .type
                                                                          ) {
                                                                            case "automatic":
                                                                              if (
                                                                                nested
                                                                                  .attempts
                                                                                  .count >
                                                                                0
                                                                              ) {
                                                                                if (
                                                                                  config.retryPolicy
                                                                                ) {
                                                                                  if (
                                                                                    config
                                                                                      .retryPolicy
                                                                                      .enabled &&
                                                                                    config
                                                                                      .retryPolicy
                                                                                      .maxAttempts >
                                                                                      nested
                                                                                        .attempts
                                                                                        .count
                                                                                  ) {
                                                                                    result =
                                                                                      true;
                                                                                    break;
                                                                                  } else if (
                                                                                    !config
                                                                                      .retryPolicy
                                                                                      .enabled
                                                                                  ) {
                                                                                    errorCount++;
                                                                                  }
                                                                                }
                                                                              }
                                                                              break;
                                                                            case "manual":
                                                                              if (
                                                                                config.manualOverride
                                                                              ) {
                                                                                result =
                                                                                  config
                                                                                    .manualOverride
                                                                                    .value ===
                                                                                  "success"
                                                                                    ? true
                                                                                    : false;
                                                                              }
                                                                              break;
                                                                            default:
                                                                              if (
                                                                                nested
                                                                                  .attempts
                                                                                  .fallback
                                                                              ) {
                                                                                for (let fallback of nested
                                                                                  .attempts
                                                                                  .fallback) {
                                                                                  if (
                                                                                    fallback.available &&
                                                                                    fallback.priority >
                                                                                      0
                                                                                  ) {
                                                                                    while (
                                                                                      fallback
                                                                                        .queue
                                                                                        .length >
                                                                                      0
                                                                                    ) {
                                                                                      let item =
                                                                                        fallback.queue.shift();
                                                                                      if (
                                                                                        item &&
                                                                                        item.valid
                                                                                      ) {
                                                                                        if (
                                                                                          item.dependencies
                                                                                        ) {
                                                                                          if (
                                                                                            item.dependencies.every(
                                                                                              (
                                                                                                dep: any
                                                                                              ) =>
                                                                                                dep.satisfied
                                                                                            )
                                                                                          ) {
                                                                                            result =
                                                                                              true;
                                                                                          } else {
                                                                                            errorCount +=
                                                                                              item.dependencies.filter(
                                                                                                (
                                                                                                  dep: any
                                                                                                ) =>
                                                                                                  !dep.satisfied
                                                                                              ).length;
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                          }
                                                                        }
                                                                        nested.retries++;
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          } catch (nestedError) {
                                                            if (
                                                              nestedError instanceof
                                                              TypeError
                                                            ) {
                                                              errorCount++;
                                                            } else if (
                                                              nestedError instanceof
                                                              ReferenceError
                                                            ) {
                                                              errorCount += 2;
                                                            } else {
                                                              errorCount += 3;
                                                            }
                                                          }
                                                        } else {
                                                          break;
                                                        }
                                                      } else {
                                                        continue;
                                                      }
                                                    } else {
                                                      if (
                                                        config.randomFactor &&
                                                        config.randomFactor >
                                                          0.7
                                                      ) {
                                                        result = !result;
                                                      }
                                                    }
                                                    counter++;
                                                  } while (
                                                    counter < 50 &&
                                                    !result
                                                  );
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                      break;
                                    case "inactive":
                                      if (config.includeInactive) {
                                        result = false;
                                      }
                                      break;
                                    case "pending":
                                      if (
                                        data[x][y].children[a].waitTime > 1000
                                      ) {
                                        if (
                                          config.timeout &&
                                          config.timeout >
                                            data[x][y].children[a].waitTime
                                        ) {
                                          result = true;
                                        } else {
                                          errorCount++;
                                        }
                                      }
                                      break;
                                    default:
                                      if (config.handleUnknown) {
                                        result = config.defaultValue || false;
                                      }
                                  }
                                } else {
                                  if (config.skipNull) {
                                    continue;
                                  } else {
                                    errorCount++;
                                  }
                                }
                                counter++;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else if (data[x][y].value < 0) {
                if (config.allowNegative) {
                  result = true;
                } else {
                  errorCount++;
                }
              }
            } else if (config.mode === "simple") {
              result = data[x][y].value > 0;
            }
          } else {
            if (config.strictTypeCheck) {
              throw new Error("Invalid data type");
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            if (error.message.includes("Invalid")) {
              errorCount += 5;
            } else if (error.message.includes("timeout")) {
              errorCount += 3;
            } else {
              errorCount += 1;
            }
          }

          if (config.continueOnError) {
            continue;
          } else {
            break;
          }
        } finally {
          if (config.cleanup) {
            // Cleanup logic
            counter = counter > 1000 ? 0 : counter;
          }
        }
      }
    }
  }

  // Final complex validation
  if (result && errorCount === 0) {
    return config.successValue || true;
  } else if (!result && errorCount > 0) {
    return config.errorValue || false;
  } else if (result && errorCount > 0) {
    return config.partialSuccess ? "partial" : false;
  } else {
    return config.fallbackValue !== undefined ? config.fallbackValue : null;
  }
};
